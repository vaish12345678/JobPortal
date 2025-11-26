


import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { COMPANY_API_POINT, JOB_API_POINT } from "../../utils/Apicall";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
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

  // Fetch companies
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${COMPANY_API_POINT}/get`, {
        withCredentials: true,
      });
      setCompanies(res.data.companies || []);
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
        if (!job) {
          toast.error("Job not found");
          return;
        }

        setFormData({
          title: job.title || "",
          description: job.description || "",
          // job.requirements may be array -> join into comma string for textarea
          requirements: Array.isArray(job.requirements) ? job.requirements.join(", ") : job.requirements || "",
          salary: job.salary ?? "",
          location: job.location || "",
          jobType: job.jobType || "",
          // backend stores experienceLevel
          experience: job.experienceLevel ?? "",
          // position stored as number
          position: job.position ?? 0,
          // if company is populated, company may be object; fallback to id if not populated
          companyId: job.company && job.company._id ? job.company._id : job.company || "",
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

    // basic required validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.requirements ||
      !formData.location ||
      !formData.companyId
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (formData.companyId.length !== 24) {
      toast.error("Invalid Company ID.");
      return;
    }

    // Build payload matching backend expectations
    const payload = {
      title: formData.title,
      description: formData.description,
      // send comma separated requirements string (backend will split)
      requirements: formData.requirements,
      salary: formData.salary,
      location: formData.location,
      jobType: formData.jobType,
      // send experience as number (backend converts to experienceLevel)
      experience: formData.experience,
      // position keep as value (backend converts to Number)
      position: formData.position,
      companyId: formData.companyId,
    };

    try {
      const res = await axios.post(`${JOB_API_POINT}/post`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
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
          {jobId ? "Edit Job Posting" : "Create Job Posting"}
        </Typography>

        <FormControl fullWidth required>
          <InputLabel>Select Company</InputLabel>
          <Select name="companyId" value={formData.companyId} label="Select Company" onChange={handleChange}>
            {companies.map((company) => (
              <MenuItem key={company._id} value={company._id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Job Title" name="title" value={formData.title} onChange={handleChange} fullWidth required />
        <TextField label="Description" name="description" value={formData.description} onChange={handleChange} multiline rows={3} fullWidth required />
        <TextField label="Requirements (comma separated)" name="requirements" value={formData.requirements} onChange={handleChange} multiline rows={3} fullWidth required />
        <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth required />
        <TextField label="Salary" name="salary" value={formData.salary} onChange={handleChange} fullWidth />
        <TextField label="Job Type" name="jobType" value={formData.jobType} onChange={handleChange} fullWidth />
        <TextField label="Experience (years)" name="experience" value={formData.experience} onChange={handleChange} fullWidth />
        <TextField label="Open Positions" name="position" type="number" value={formData.position} onChange={handleChange} fullWidth />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit Job
        </Button>
      </Box>
    </div>
  );
};

export default JobCreate;
