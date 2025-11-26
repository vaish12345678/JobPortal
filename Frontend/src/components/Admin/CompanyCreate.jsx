

import React from "react";
import Navbar from "../shared/Navbar";
import {useState, useEffect} from "react"
import { COMPANY_API_POINT } from "../../utils/Apicall";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "sonner"
import { 
  Box, 
  Card, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Stepper,
  Step,
  StepLabel,
  Alert
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = ['Company Details', 'Add Jobs', 'Review & Publish'];

  const registerCompany = async () => {
    if (!companyName.trim()) {
      setError("Company name is required");
      toast.error("Please enter a company name");
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      const res = await axios.post(`${COMPANY_API_POINT}/register`, 
        { companyName }, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        }
      );
      
      if (res?.data?.success) {
        const companyId = res?.data?.company?._id;
        toast.success(`"${companyName}" created successfully!`);
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Failed to create company";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      registerCompany();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <Box sx={{ 
        maxWidth: "800px", 
        mx: "auto", 
        py: 6,
        px: { xs: 2, md: 4 }
      }}>
        {/* Header Card */}
        <Card sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 3,
          background: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}>
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            gap: 2,
            mb: 3 
          }}>
            <BusinessIcon sx={{ 
              fontSize: 48, 
              color: "primary.main",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              p: 1,
              borderRadius: 3
            }} />
            <Box>
              <Typography 
                variant="h3" 
                component="h1" 
                fontWeight="bold" 
                color="#1e293b"
                gutterBottom
              >
                Create New Company
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Add a new company to your directory
              </Typography>
            </Box>
          </Box>

          {/* Stepper */}
          <Stepper activeStep={0} sx={{ mt: 4, mb: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Card>

        {/* Form Card */}
        <Card sx={{ 
          p: 5, 
          borderRadius: 3,
          background: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          position: "relative"
        }}>
          {/* Decorative Elements */}
          <Box sx={{
            position: "absolute",
            top: -10,
            right: -10,
            width: 100,
            height: 100,
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            borderRadius: "50%",
            opacity: 0.1,
            zIndex: 0
          }} />
          
          <Box sx={{
            position: "absolute",
            bottom: -20,
            left: -20,
            width: 150,
            height: 150,
            background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
            borderRadius: "50%",
            opacity: 0.1,
            zIndex: 0
          }} />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography 
              variant="h5" 
              fontWeight="600" 
              color="#1e293b"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
            >
              <CheckCircleIcon color="primary" />
              Company Information
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3, 
                  borderRadius: 2,
                  "& .MuiAlert-message": {
                    fontWeight: 500
                  }
                }}
              >
                {error}
              </Alert>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ mb: 2, fontWeight: 500 }}
              >
                Enter the official name of the company you want to register. 
                This name will be used across the platform.
              </Typography>
              
              <TextField
                fullWidth
                variant="outlined"
                label="Company Name"
                placeholder="e.g., Google, Microsoft, Amazon..."
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setError("");
                }}
                onKeyPress={handleKeyPress}
                error={!!error}
                helperText={error || " "}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    fontSize: "1.1rem",
                    "&:hover fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                      borderWidth: 2,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1rem",
                    fontWeight: 500,
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <BusinessIcon 
                      sx={{ 
                        mr: 2, 
                        color: companyName ? "primary.main" : "text.secondary" 
                      }} 
                    />
                  ),
                }}
              />
            </Box>

            {/* Tips Section */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 4, 
                borderRadius: 2,
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0"
              }}
            >
              <Typography variant="h6" fontWeight="600" color="#1e293b" gutterBottom>
                💡 Tips for company naming:
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • Use the official registered company name
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                • Avoid abbreviations unless widely recognized
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Ensure the name is unique in your directory
              </Typography>
            </Paper>

            {/* Action Buttons */}
            <Box sx={{ 
              display: "flex", 
              gap: 2, 
              justifyContent: "flex-end",
              flexWrap: "wrap"
            }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/admin/companies")}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "none",
                  borderColor: "#64748b",
                  color: "#64748b",
                  "&:hover": {
                    borderColor: "#475569",
                    backgroundColor: "#f1f5f9",
                    transform: "translateY(-1px)"
                  },
                  transition: "all 0.2s ease"
                }}
              >
                Back to Companies
              </Button>
              
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={registerCompany}
                disabled={loading || !companyName.trim()}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "none",
                  bgcolor: "#3b82f6",
                  boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
                  "&:hover": {
                    bgcolor: "#2563eb",
                    boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.5)",
                    transform: "translateY(-1px)"
                  },
                  "&:disabled": {
                    bgcolor: "#cbd5e1",
                    boxShadow: "none",
                    transform: "none"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                {loading ? "Creating..." : "Continue"}
              </Button>
            </Box>
          </Box>
        </Card>

        {/* Quick Stats */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: 4, 
          mt: 4,
          flexWrap: "wrap"
        }}>
          
         
        </Box>
      </Box>
    </div>
  );
};

export default CompanyCreate;