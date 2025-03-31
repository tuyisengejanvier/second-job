import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Submitting Data:", data);
    setLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      // Convert prices to numbers
      data.minPrice = parseFloat(data.minPrice) || 0;
      data.maxPrice = parseFloat(data.maxPrice) || 0;
      data.postingDate = new Date(data.postingDate).toISOString();
      data.skills = selectedOption ? selectedOption.map(option => option.value) : [];

<<<<<<< HEAD
      const response = await fetch("http://localhost:3000/v1/jobs", { 
=======
      const response = await fetch("https://backend-neon-mu-52.vercel.app/v1/jobs", { 
>>>>>>> 92a1333 (frist commit)
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post job");
      }

      const result = await response.json();
      console.log("Response:", result);

      Swal.fire({
        title: "Success!",
        text: result.message || "Job Posted Successfully!!!",
        icon: "success",
        confirmButtonText: "OK",
      });

      reset();
      setSelectedOption(null);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: error.message || "Something went wrong, please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Job Title */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                {...register("jobTitle", { required: "Job Title is required" })}
                className="create-job-input"
              />
              {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                {...register("companyName", { required: "Company Name is required" })}
                className="create-job-input"
              />
              {errors.companyName && <p className="text-red-500">{errors.companyName.message}</p>}
            </div>
          </div>

          {/* Salary */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="number"
                {...register("minPrice", { 
                  required: "Minimum Salary is required",
                  min: { value: 0, message: "Must be positive number" }
                })}
                className="create-job-input"
              />
              {errors.minPrice && <p className="text-red-500">{errors.minPrice.message}</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="number"
                {...register("maxPrice", { 
                  required: "Maximum Salary is required",
                  min: { value: 0, message: "Must be positive number" }
                })}
                className="create-job-input"
              />
              {errors.maxPrice && <p className="text-red-500">{errors.maxPrice.message}</p>}
            </div>
          </div>

          {/* Salary Type & Location */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                {...register("salaryType", { required: "Salary Type is required" })}
                className="create-job-input"
              >
                <option value="">Select</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              {errors.salaryType && <p className="text-red-500">{errors.salaryType.message}</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                {...register("jobLocation", { required: "Job Location is required" })}
                className="create-job-input"
              />
              {errors.jobLocation && <p className="text-red-500">{errors.jobLocation.message}</p>}
            </div>
          </div>

          {/* Posting Date & Experience Level */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Posting Date</label>
              <input
                type="date"
                {...register("postingDate", { required: "Posting Date is required" })}
                className="create-job-input"
              />
              {errors.postingDate && <p className="text-red-500">{errors.postingDate.message}</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel", { required: "Experience Level is required" })}
                className="create-job-input"
              >
                <option value="">Select</option>
                <option value="NoExperience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
              {errors.experienceLevel && <p className="text-red-500">{errors.experienceLevel.message}</p>}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-2 text-lg">Required Skills</label>
            <CreatableSelect
              className="create-job-input py-4"
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* Company Logo & Employment Type */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                {...register("companyLogo", {
                  pattern: {
                    value: /^(https?:\/\/).+$/i,
                    message: "Please enter a valid URL starting with http:// or https://",
                  },
                })}
                className="create-job-input"
                placeholder="https://example.com/logo.png"
              />
              {errors.companyLogo && <p className="text-red-500">{errors.companyLogo.message}</p>}
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType", { required: "Employment Type is required" })}
                className="create-job-input"
              >
                <option value="">Select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
              {errors.employmentType && <p className="text-red-500">{errors.employmentType.message}</p>}
            </div>
          </div>

          {/* Job Description */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              {...register("description", { 
                required: "Job Description is required",
                minLength: {
                  value: 50,
                  message: "Description must be at least 50 characters"
                }
              })}
              className="w-full create-job-input"
              rows={6}
              placeholder="Enter detailed job description (at least 50 characters)"
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="block mt-12 bg-red-600 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer hover:bg-blue-700 transition-colors"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;