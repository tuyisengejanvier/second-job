import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Initialize environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection setup
const uri = process.env.MONGO_DB_URL;
if (!uri) {
  console.error("MongoDB connection URI is missing in environment variables");
  process.exit(1);
}

// Mask password in logs for security
console.log("Connecting to MongoDB with URI:", uri.replace(/:[^@]+@/, ':<PASSWORD>@'));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 5000,
  socketTimeoutMS: 30000,
});

// Database references
let db;
let jobsCollection;
let usersCollection;

// Improved connection function
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    
    // Initialize database and collections
    db = client.db("mern-Job-Portal");
    jobsCollection = db.collection("demoJobs");
    usersCollection = db.collection("users");
    
    // Verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged deployment. Connection is healthy!");
    
    return client;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    
    // Close connection if it was partially established
    if (client) {
      await client.close().catch(err => {
        console.error("Error while closing connection:", err);
      });
    }
    
    process.exit(1);
  }
}

// Connection state middleware
app.use(async (req, res, next) => {
  if (!client || !client.topology || !client.topology.isConnected()) {
    try {
      await connectDB();
    } catch (err) {
      return res.status(503).json({ 
        message: "Database unavailable",
        error: err.message 
      });
    }
  }
  next();
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization token required"
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token"
      });
    }
    req.user = user;
    next();
  });
};

// Job posting endpoint
app.post('/v1/jobs', authenticateToken, async (req, res) => {
  try {
    const jobData = req.body;
    jobData.createdAt = new Date();
    jobData.postedBy = req.user.userId;
    
    if (!jobData.jobTitle || !jobData.companyName) {
      return res.status(400).json({
        success: false,
        message: "Job title and company name are required"
      });
    }

    const result = await jobsCollection.insertOne(jobData);
    
    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      jobId: result.insertedId
    });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({
      success: false,
      message: "Failed to post job",
      error: error.message
    });
  }
});

// Get all jobs (authenticated)
app.get('/v1/jobs', authenticateToken, async (req, res) => {
  try {
    const jobs = await jobsCollection.find({}).toArray();
    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
      error: error.message
    });
  }
});

// Get jobs for specific user
app.get('/v1/my-jobs', authenticateToken, async (req, res) => {
  try {
    const jobs = await jobsCollection.find({
      postedBy: new ObjectId(req.user.userId)
    }).toArray();
    
    res.status(200).json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error("Error fetching user jobs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your jobs",
      error: error.message
    });
  }
});

// Start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log("Shutting down gracefully...");
  await client.close();
  process.exit(0);
});