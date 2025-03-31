import React, { useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // For navigation to the sign-in page
import Swal from "sweetalert2"; // Import SweetAlert2

const Signup = () => {

  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Handle Email & Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    try {
      // Sign up with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Prepare user data for MongoDB
      const newUser = {
        uid: user.uid, // Firebase user ID
        firstName,
        lastName,
        password,
        email: user.email,
        createdAt: new Date().toISOString(),
      };

      // Send user data to backend
<<<<<<< HEAD
      const response = await fetch("http://127.0.0.1:3000/v1/users", {
=======
      const response = await fetch("https://backend-neon-mu-52.vercel.app/v1/users", {
>>>>>>> 92a1333 (frist commit)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save user data.");
      }

      console.log("User Registered & Saved:", user);

      // Show success alert and redirect to login page
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'You have successfully registered. Please log in.',
      }).then(() => {
        navigate("/login"); // Redirect after success
      });
    } catch (error) {
      console.error("Signup Error:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      });
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/")
    } catch (error) {
      console.error("Google Signup Error:", error.message);
      Swal.fire({
        icon: 'error',
        title: 'Google Signup Error!',
        text: error.message,
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 rounded-lg shadow-lg w-full max-w-[30rem] h-screen">
        <h2 className="text-2xl font-semibold text-center mb-3">Create Account</h2>

        {/* Email & Password Signup */}
        <form className="space-y-4" onSubmit={handleSignup}>

          <div className="flex justify-between gap-3">
          <div>
            <label className="text-sm font-medium text-gray-600">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          </div>
          

          <div>
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
            
          <div className="flex gap-3 justify-between">

          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="************"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              placeholder="************"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          </div>


          <button type="submit" className="bg-blue/90 hover:bg-blue text-white py-2 px-6 rounded-lg w-full">
            Sign Up
          </button>
        </form>

        {/* Social Signup */}
        <div className="mt-4 text-gray-500 text-sm">Already have account <Link to={"/login"} className="text-blue text-sm">Signin</Link> </div>
        <div className="flex gap-4 mt-2">
          <button className="flex items-center gap-2 hover:underline " onClick={handleGoogleSignup}>
            <FaGoogle className="text-red-500 text-sm" /> 
            <p className="text-sm text-gray-400">Continue with Google account</p>
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">©2025 JobPortal. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Signup;
