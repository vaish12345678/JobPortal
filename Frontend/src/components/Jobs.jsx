import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import axios from "axios";
import { JOB_API_POINT } from "../utils/Apicall";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all jobs once
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_POINT}/get`, {
          withCredentials: true,
        });
        setJobs(res.data.jobs);
        setFilteredJobs(res.data.jobs); // Initially show all
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Handle filter changes
  const handleFiltersChange = (filters) => {
    const filtered = jobs.filter((job) => {
      const jobTitle = job.title?.toLowerCase() || "";
      const jobLocation = job.location?.toLowerCase() || "";
      const jobSalary = job.salary?.toLowerCase?.() || job.salary?.toString() || "";

      const matchLocation = filters.Location
        ? jobLocation.includes(filters.Location.toLowerCase())
        : true;

      const matchIndustry = filters.Industry
        ? jobTitle.includes(filters.Industry.toLowerCase())
        : true;

      const matchSalary = filters.Salary
        ? jobSalary.includes(filters.Salary.split("-")[0].toLowerCase()) // simple match
        : true;

      return matchLocation && matchIndustry && matchSalary;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 flex gap-5 px-4">
        <div className="w-1/5">
          <FilterCard onFiltersChange={handleFiltersChange} />
        </div>

        <div className="flex-1">
          {loading ? (
            <div className="text-center text-lg">Loading jobs...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center text-lg text-gray-600">No jobs found</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
