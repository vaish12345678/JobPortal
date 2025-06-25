import React from "react";
import Navbar from "../shared/Navbar";
import { useState, useEffect } from "react";
import { JOB_API_POINT } from "../../utils/Apicall";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

import { toast } from "sonner";

const companyArray=[];
const JobCreate = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();

  const [formData, setFormData] = useState({
    title: " ",
    description: " ",
    requirements: " ",
    salary: " ",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        setFormData((prev) => ({
          ...prev,
          jobName: res.data.job.jobName,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("requirements", formData.requirements);
      data.append("location", formData.location);
      data.append("salary", formData.salary);
      data.append("jobType", formData.jobType);
      data.append("experienceLevel", formData.experienceLevel);
      data.append("position", formData.position);

      const res = await axios.post(
        `${JOB_API_POINT}/post`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("job posted successfully!");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete setup.");
    }
  };

  return (
    <div>
      <Navbar />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 4,
          p: 2,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Job Details Form
        </Typography>

        <TextField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          required
        />

        <TextField
          label="Requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={3}
          fullWidth
          required
        />

        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Salary"
          name="salary"
          type="text"
          value={formData.salary}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Job Type"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Experience Level"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Open Positions"
          name="position"
          type="number"
          value={formData.position}
          onChange={handleChange}
          fullWidth
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Job
        </Button>
      </Box>
    </div>
  );
};

export default JobCreate;
