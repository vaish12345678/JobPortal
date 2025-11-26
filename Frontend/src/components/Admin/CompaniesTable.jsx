

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Chip,
  Card,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { COMPANY_API_POINT } from "../../utils/Apicall";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BusinessIcon from "@mui/icons-material/Business";

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${COMPANY_API_POINT}/get`, {
        withCredentials: true,
      });

      if (res?.data?.success && Array.isArray(res.data.companies)) {
        setCompanies(res.data.companies);
        toast.success(res.data.message || "Companies fetched successfully");
      } else {
        setCompanies([]);
        toast.error(res.data.message || "Failed to fetch companies");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Something went wrong while fetching companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
   
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "400px",
        flexDirection: "column",
        gap: 2
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading Companies...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: "1400px", 
      mx: "auto", 
      px: { xs: 2, md: 4 }, 
      py: 4,
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      minHeight: "100vh"
    }}>
      {/* Header Section */}
      <Card sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 3,
        background: "white",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          justifyContent: "space-between", 
          alignItems: { xs: "stretch", md: "center" },
          gap: 3 
        }}>
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight="bold" 
              color="#1e293b"
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 2,
                mb: 1 
              }}
            >
              <BusinessIcon sx={{ fontSize: 40, color: "#3b82f6" }} />
              Companies Directory
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and explore all registered companies
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/admin/companies/create")}
            sx={{
              bgcolor: "#3b82f6",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: "1rem",
              fontWeight: "600",
              textTransform: "none",
              boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
              "&:hover": {
                bgcolor: "#2563eb",
                boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.5)",
                transform: "translateY(-1px)"
              },
              transition: "all 0.3s ease"
            }}
          >
            New Company
          </Button>
        </Box>
      </Card>

      {/* Search and Stats Section */}
      <Card sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 3,
        background: "white",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
      }}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          justifyContent: "space-between", 
          alignItems: { xs: "stretch", md: "center" },
          gap: 3 
        }}>
          <TextField
            fullWidth
            placeholder="Search companies by name..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              maxWidth: 400,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2 
          }}>
            <Chip 
              label={`${filteredCompanies.length} Companies`}
              variant="outlined"
              color="primary"
              sx={{ 
                fontWeight: 600,
                fontSize: "0.9rem",
                px: 1
              }}
            />
            <Chip 
              label={`${companies.length} Total`}
              variant="filled"
              color="primary"
              sx={{ 
                fontWeight: 600,
                fontSize: "0.9rem",
                px: 1
              }}
            />
          </Box>
        </Box>
      </Card>

      {/* Companies Table */}
      <Card sx={{ 
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ 
              backgroundColor: "primary.main",
              "& th": {
                border: 0,
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                py: 3
              }
            }}>
              <TableRow>
                <TableCell sx={{ width: "80px" }}>Logo</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell sx={{ width: "150px" }}>Registration Date</TableCell>
                <TableCell sx={{ width: "120px" }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                    <Box sx={{ textAlign: "center" }}>
                      <BusinessIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No companies found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {search ? "Try adjusting your search terms" : "Get started by adding your first company"}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((company, index) => (
                  <TableRow 
                    key={company._id}
                    sx={{ 
                      backgroundColor: index % 2 === 0 ? 'white' : '#f8fafc',
                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                        transform: "scale(1.002)",
                        transition: "all 0.2s ease"
                      },
                      transition: "all 0.2s ease"
                    }}
                  >
                    <TableCell>
                      <Avatar 
                        alt={company.name} 
                        src={company.logo || ""}
                        sx={{ 
                          width: 50, 
                          height: 50,
                          border: "2px solid #e2e8f0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}
                      >
                        {!company.logo && company.name?.charAt(0)}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight="600" color="#1e293b">
                        {company.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {company.email || "No email provided"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" fontWeight="500">
                          {company.createdAt
                            ? new Date(company.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : "N/A"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        sx={{
                          bgcolor: "#10b981",
                          borderRadius: 2,
                          px: 2,
                          py: 1,
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          textTransform: "none",
                          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
                          "&:hover": {
                            bgcolor: "#059669",
                            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
                            transform: "translateY(-1px)"
                          },
                          transition: "all 0.2s ease"
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Footer Info */}
      {filteredCompanies.length > 0 && (
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredCompanies.length} of {companies.length} companies
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CompaniesTable;