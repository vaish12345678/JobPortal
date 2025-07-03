import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_POINT, JOB_API_POINT } from "../utils/Apicall";

const JobDescription = () => {
  const { id } = useParams(); // get job ID from URL
  const [isApplied, setIsApplied] = useState(false);
  const [job, setJob] = useState(null);
  const [totalApplications, setTotalApplications] = useState(0);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_POINT}/${id}/applicants`, {
        withCredentials: true,
      });

      console.log("API Response:", res.data);
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
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{job.title}</h1>
            <br />
            <div className="flex gap-2 mb-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs text-bold">
                {job.jobType}
              </span>

              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                {job.salary} LPA
              </span>

              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
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
      backgroundColor: "#b0b0b0", // Light gray
      color: "#ffffff", // White text
    },
  }}
>
  {isApplied ? "Already Applied" : "Apply Now"}
</Button>

        </div>

        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 my-10">
        <h1 className="font-bold my-1 px-4">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">{job.title}</span>
        </h1>
        <h1 className="font-bold my-1 px-4">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">{job.location}</span>
        </h1>
        <h1 className="font-bold my-1 px-4">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job.description}
          </span>
        </h1>
        <h1 className="font-bold my-1 px-4">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job.experience}
          </span>
        </h1>
        <h1 className="font-bold my-1 px-4">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1 px-4">
          Total Applications:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {totalApplications}
          </span>
        </h1>
        <h1 className="font-bold my-1 px-4">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {job.postedAgo}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
