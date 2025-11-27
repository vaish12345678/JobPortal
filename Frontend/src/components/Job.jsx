import React from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Job = ({job}) => {
  const navigate= useNavigate();
  
  return (
    <div className="flex-1 min-w-[280px] max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 m-2">
      <p className="text-gray-700 text-sm">2 days ago</p>
      <br></br>

      {/* Job Header with Logo and Job Info */}
      <div className="flex items-start gap-4 mb-4">
        <Avatar
          alt="Company Logo"
          src="https://images.unsplash.com/photo-1706426629246-2a3c3e3e3ff2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fEdvb2dsZSUyMGxvZ298ZW58MHx8MHx8fDA%3D" // Replace with your logo path
          sx={{ width: 48, height: 48 }} // Adjust size
        />
        <div>
          <h3 className="text-md font-semibold text-blue-600">
            {job.title}
          </h3>
          <p className="text-xs text-gray-500">{job.company?.name}.{job.location}</p>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-gray-700 text-sm mb-3">
        {job.description?.slice(0,80)}...
      </p>
      <br></br>

      {/* Job Type, Package, and Positions Badges */}
      <div className="flex gap-2 mb-3">
        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs text-bold">
          {job.jobType || "Full Time"}
        </span>

        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
          ₹{job.salary || "not specified"} LPA
        </span>

        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
          {job.position} Positions
        </span>
      </div>

      {/* Apply Button */}

      <div className="flex space-x-4 mt-4">
        <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition" onClick={()=>navigate(`/description/${job._id}`)}>
          Details
        </button>
        <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded hover:bg-blue-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default Job;
