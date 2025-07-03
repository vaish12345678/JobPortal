
import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { COMPANY_API_POINT, JOB_API_POINT } from "../../utils/Apicall";
import { useNavigate, useParams } from "react-router-dom";
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";
import { toast } from "sonner";

const JobCreate = () => {
  const navigate = useNavigate();
  const { id: jobId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);

  // 🟡 Fetch existing companies for dropdown
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${COMPANY_API_POINT}/get`, {
        withCredentials: true,
      });
      setCompanies(res.data.companies);
    } catch (error) {
      console.error("Failed to fetch companies", error);
      toast.error("Failed to load companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);


  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        const job = res.data.job;
        setFormData({
          title: job.title || "",
          description: job.description || "",
          requirements: job.requirements || "",
          salary: job.salary || "",
          location: job.location || "",
          jobType: job.jobType || "",
          experience: job.experience || "",
          position: job.position || 0,
          companyId: job.companyId || "",
        });
      } catch (err) {
        console.error("Failed to fetch job", err);
        toast.error("Failed to fetch job details.");
      }
    };

    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.requirements || !formData.location || !formData.companyId) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (formData.companyId.length !== 24) {
      toast.error("Invalid Company ID.");
      return;
    }

    try {
      const res = await axios.post(`${JOB_API_POINT}/post`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        toast.success("Job posted successfully!");
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("API Error:", error.response || error);
      toast.error(error?.response?.data?.message || "Failed to post job.");
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
          Create Job Posting
        </Typography>

        {/* Company Dropdown */}
        <FormControl fullWidth required>
          <InputLabel>Select Company</InputLabel>
          <Select
            name="companyId"
            value={formData.companyId}
            label="Select Company"
            onChange={handleChange}
          >
            {companies.map((company) => (
              <MenuItem key={company._id} value={company._id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Job Title" name="title" value={formData.title} onChange={handleChange} fullWidth required />
        <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} fullWidth required />
        <TextField label="Requirements" name="requirements" value={formData.requirements} onChange={handleChange} multiline rows={3} fullWidth required />
        <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth required />
        <TextField label="Salary" name="salary" value={formData.salary} onChange={handleChange} fullWidth />
        <TextField label="Job Type" name="jobType" value={formData.jobType} onChange={handleChange} fullWidth />
        <TextField label="Experience" name="experience" value={formData.experience} onChange={handleChange} fullWidth />
        <TextField label="Open Positions" name="position" type="number" value={formData.position} onChange={handleChange} fullWidth />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Job
        </Button>
      </Box>
    </div>
  );
};

export default JobCreate;
