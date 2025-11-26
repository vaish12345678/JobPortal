

import { useLocation } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import axios from "axios";
import { useState, useEffect } from "react";
import { JOB_API_POINT } from "../utils/Apicall";

const Browse = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  // Fetch jobs once
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_POINT}/get`, {
          withCredentials: true,
        });

        const jobs = res.data.jobs || [];
        setAllJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs", err);
      }
    };

    fetchJobs();
  }, []);


  // Filter jobs whenever search query or jobs change
  useEffect(() => {
    const filtered = allJobs.filter((job) => {
      const title =
        typeof job.title === "string" ? job.title.toLowerCase() : "";
      const company =
        typeof job.company === "string"
          ? job.company.toLowerCase()
          : job.company?.name?.toLowerCase?.() || "";
      const location =
        typeof job.location === "string" ? job.location.toLowerCase() : "";

      return (
        title.includes(searchQuery) ||
        company.includes(searchQuery) ||
        location.includes(searchQuery)
      );
    });

    setFilteredJobs(filtered);
  }, [searchQuery, allJobs]);

  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-20 my-10">
        <h1 className="font-bold">Search Results: ({filteredJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {filteredJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
