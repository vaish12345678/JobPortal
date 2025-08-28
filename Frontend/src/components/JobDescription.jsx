

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_POINT, JOB_API_POINT } from "../utils/Apicall";

const JobDescription = () => {
  const { id } = useParams();
  const [isApplied, setIsApplied] = useState(false);
  const [job, setJob] = useState(null);
  const [totalApplications, setTotalApplications] = useState(0);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_POINT}/${id}/applicants`, {
        withCredentials: true,
      });
      setJob(res.data.job);
      setIsApplied(res.data.isApplied);
      setTotalApplications(res.data.job.applications?.length || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch job details.");
    }
  };

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_POINT}/apply/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsApplied(true);
        setTotalApplications((prev) => prev + 1);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Application failed");
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (!job) {
    return (
      <div className="text-center mt-10 text-red-500">
        Job not found or still loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-6">
        {/* Job Card */}
        <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex flex-wrap gap-3 mt-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {job.jobType}
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.salary} LPA
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  {job.position} Positions
                </span>
              </div>
            </div>

            <Button
              variant="contained"
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              sx={{
                "&.Mui-disabled": {
                  backgroundColor: "#b0b0b0",
                  color: "#ffffff",
                },
                px: 5,
                py: 1.5,
                fontWeight: "bold",
              }}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          {/* Job Description */}
          <div className="mt-8 border-t pt-6 space-y-4">
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Role:</h2>
              <p className="text-gray-900">{job.title}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Location:</h2>
              <p className="text-gray-900">{job.location}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Description:</h2>
              <p className="text-gray-900">{job.description}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Experience:</h2>
              <p className="text-gray-900">{job.experience}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Salary:</h2>
              <p className="text-gray-900">{job.salary} LPA</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Total Applications:</h2>
              <p className="text-gray-900">{totalApplications}</p>
            </div>
            <div className="flex justify-between">
              <h2 className="font-semibold text-gray-700">Posted:</h2>
              <p className="text-gray-900">{job.postedAgo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
