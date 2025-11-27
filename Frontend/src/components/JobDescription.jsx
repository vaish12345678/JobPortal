import axios from "axios";
import React, { useState, useEffect } from "react";
import { 
  Button, 
  Box, 
  Typography, 
  Card, 
  Chip, 
  Paper, 
  Divider,
  CircularProgress
} from "@mui/material";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";

import { toast } from "sonner";
import { APPLICATION_API_POINT, JOB_API_POINT } from "../utils/Apicall";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";

const JobDescription = () => {
  const { id } = useParams();
  const [isApplied, setIsApplied] = useState(false);
  const [job, setJob] = useState(null);
  const [totalApplications, setTotalApplications] = useState(0);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <Box className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Box className="text-center">
          <CircularProgress size={40} />
          <Typography variant="h6" className="mt-2 text-gray-600">
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (!job) {
    return (
      <Box className="min-h-screen bg-gray-50">
        <Navbar />
        <Box className="text-center mt-10">
          <Typography variant="h5" color="error">
            Job not found
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-50">
      <Navbar />
      <Box className="max-w-4xl mx-auto py-4 px-4">
        {/* Main Job Card */}
        <Card 
          sx={{ 
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          {/* Header Section */}
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <WorkIcon color="primary" sx={{ fontSize: 24 }} />
                  <Typography variant="h5" fontWeight="bold">
                    {job.title}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <BusinessIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body1" color="text.secondary">
                    {job.company?.name}
                  </Typography>
                </Box>

                {/* Job Tags */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    size="small"
                    label={job.jobType} 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    size="small"
                    label={`${job.salary} LPA`} 
                    color="success" 
                    variant="outlined"
                  />
                  <Chip 
                    size="small"
                    label={`${job.position} Positions`} 
                    color="info" 
                    variant="outlined"
                  />
                </Box>
              </Box>

              {/* Apply Button */}
              <Button
                variant="contained"
                size="medium"
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: "#10b981",
                    color: "white",
                  },
                  px: 3,
                  py: 1,
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  borderRadius: 1,
                  textTransform: 'none',
                  minWidth: '120px'
                }}
              >
                {isApplied ? "Applied ✓" : "Apply Now"}
              </Button>
            </Box>
          </Box>

          <Divider />

          {/* Job Details */}
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
              Job Details
            </Typography>

            <Box sx={{ display: 'grid', gap: 2 }}>
              {/* Location */}
              <Paper sx={{ p: 2, borderRadius: 1 }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Location
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {job.location}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Experience */}
              <Paper sx={{ p: 2, borderRadius: 1 }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Experience
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {job.experience}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Salary */}
              <Paper sx={{ p: 2, borderRadius: 1 }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Salary
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {job.salary} LPA
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Applications */}
              <Paper sx={{ p: 2, borderRadius: 1 }} elevation={0}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Applications
                    </Typography>
                    <Typography variant="body1" fontWeight="500">
                      {totalApplications}
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Job Description */}
              <Paper sx={{ p: 2, borderRadius: 1 }} elevation={0}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                  {job.description}
                </Typography>
              </Paper>

              {/* Requirements */}
              {job.requirements && (
                <Paper sx={{ p: 2, borderRadius: 1 }} elevation={0}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Requirements
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                    {job.requirements}
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default JobDescription;