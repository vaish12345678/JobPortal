// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { toast } from "sonner";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { COMPANY_API_POINT } from "../../utils/Apicall";

// // const CompanySetup = () => {
// //   const { companyId } = useParams();
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     website: "",
// //     description: "",
// //     location: "",
// //     file:"",
// //   });

// //   // Fetch company name (optional)
// // //   useEffect(() => {
// // //     const fetchCompany = async () => {
// // //       try {
// // //         const res = await axios.get(`${COMPANY_API_POINT}/${companyId}`, {
// // //           withCredentials: true,
// // //         });
// // //         setFormData((prev) => ({
// // //           ...prev,
// // //           companyName: res.data.company.companyName,
// // //         }));
// // //       } catch (err) {
// // //         console.log(err);
// // //       }
// // //     };
// // //     fetchCompany();
// // //   }, [companyId]);

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const changeFileHandler=(e)=>{
// //     const file=e.target.files?.[0];
// //     setFormData({ ...formData,file});

// //   }

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.put(
// //         `${COMPANY_API_POINT}/update/${companyId}`,
// //         formData,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //           withCredentials: true,
// //         }
// //       );
// //       if (res.data.success) {
// //         toast.success("Company setup completed!");
// //         navigate("/admin/companies");
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("Failed to complete setup.");
// //     }
// //     console.log(formData);
// //   };

// //   return (
// //     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
// //       <h2 className="text-2xl font-bold mb-4">Complete Company Setup</h2>
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           type="text"
// //           name="name"
// //           value={formData.name}

// //           className="w-full border px-4 py-2 rounded bg-gray-100"
// //         />

// //         <input
// //           type="text"
// //           name="website"
// //           placeholder="Company Website"
// //           value={formData.website}
// //           onChange={handleChange}
// //           className="w-full border px-4 py-2 rounded"
// //         />

// //         <textarea
// //           name="description"
// //           placeholder="Company Description"
// //           value={formData.description}
// //           onChange={handleChange}
// //           className="w-full border px-4 py-2 rounded"
// //           rows={4}
// //         />

// //         <input
// //           type="text"
// //           name="location"
// //           placeholder="Location"
// //           value={formData.location}
// //           onChange={handleChange}
// //           className="w-full border px-4 py-2 rounded"
// //         />
// //          <input
// //           type="file"
// //           name="file"
// //           placeholder="upload logo"
// //           accept="image/*"
// //           onChange={changeFileHandler}
// //           className="w-full border px-4 py-2 rounded"
// //         />

// //         <button
// //           type="submit"
// //           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //         >
// //           Save & Finish
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default CompanySetup;


// import React, { useState,useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { useParams, useNavigate } from "react-router-dom";
// import { COMPANY_API_POINT } from "../../utils/Apicall";

// const CompanySetup = () => {
//   const {id: companyId } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     website: "",
//     description: "",
//     location: "",
//     file: null,
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     setFormData((prev) => ({
//       ...prev,
//       file,
//     }));
//   };

//    useEffect(() => {
//     const fetchCompany = async () => {
//       try {
//         const res = await axios.get(`${COMPANY_API_POINT}/get/${companyId}`, {
//           withCredentials: true,
//         });
//         setFormData((prev) => ({
//           ...prev,
//           companyName: res.data.company.companyName,
//         }));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchCompany();
//   }, [companyId]);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("website", formData.website);
//       data.append("description", formData.description);
//       data.append("location", formData.location);
//       if (formData.file) {
//         data.append("file", formData.file);
//       }

//       const res = await axios.put(
//         `${COMPANY_API_POINT}/update/${companyId}`,
//         data,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         toast.success("Company setup completed!");
//         navigate("/admin/companies");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to complete setup.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
//       <h2 className="text-2xl font-bold mb-4">Complete Company Setup</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <button
//           type="button"
//           className="bg-gray-800 text-white px-4 py-2 rounded"
//           onClick={() => navigate(-1)} // Go back to previous page
//         >
//           Back
//         </button>

//         <input
//           type="text"
//           name="name"
//           placeholder="Company Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded bg-gray-100"
//         />

//         <input
//           type="text"
//           name="website"
//           placeholder="Company Website"
//           value={formData.website}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />

//         <textarea
//           name="description"
//           placeholder="Company Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//           rows={4}
//         />

//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//           className="w-full border px-4 py-2 rounded"
//         />

//         <input
//           type="file"
//           name="file"
//           accept="image/*"
//           onChange={changeFileHandler}
//           className="w-full border px-4 py-2 rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Save & Finish
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CompanySetup;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { COMPANY_API_POINT } from "../../utils/Apicall";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Avatar
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import DescriptionIcon from "@mui/icons-material/Description";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ImageIcon from "@mui/icons-material/Image";

const CompanySetup = () => {
  const { id: companyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
      }));
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        const company = res.data.company;
        setFormData((prev) => ({
          ...prev,
          name: company.name || "",
          website: company.website || "",
          description: company.description || "",
          location: company.location || "",
        }));
        if (company.logo) {
          setImagePreview(company.logo);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to load company data");
      }
    };
    fetchCompany();
  }, [companyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("website", formData.website);
      data.append("description", formData.description);
      data.append("location", formData.location);
      if (formData.file) {
        data.append("file", formData.file);
      }

      const res = await axios.put(
        `${COMPANY_API_POINT}/update/${companyId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Company setup completed successfully! 🎉");
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete setup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <Box sx={{ maxWidth: "800px", mx: "auto", px: { xs: 2, md: 4 } }}>
        
        {/* Header Card */}
        <Card sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 3,
          background: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, mb: 2 }}>
            <BusinessIcon sx={{ 
              fontSize: 48, 
              color: "primary.main",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              p: 1,
              borderRadius: 3
            }} />
            <Box>
              <Typography variant="h3" component="h1" fontWeight="bold" color="#1e293b" gutterBottom>
                Complete Company Setup
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Fill in the details to complete your company profile
              </Typography>
            </Box>
          </Box>
        </Card>

        {/* Form Card */}
        <Card sx={{ 
          p: 5, 
          borderRadius: 3,
          background: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Back Button */}
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                mb: 3,
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                  transform: "translateX(-2px)"
                },
                transition: "all 0.2s ease"
              }}
            >
              Back to Previous
            </Button>

            {/* Company Logo Upload */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h6" fontWeight="600" color="#1e293b" gutterBottom>
                Company Logo
              </Typography>
              <Avatar
                src={imagePreview}
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  border: "3px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              >
                <BusinessIcon sx={{ fontSize: 48 }} />
              </Avatar>
              <Button
                variant="outlined"
                component="label"
                startIcon={<ImageIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "600"
                }}
              >
                Upload Logo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={changeFileHandler}
                />
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Recommended: 500x500px PNG or JPG
              </Typography>
            </Box>

            {/* Form Fields Grid */}
            <Box sx={{ display: "grid", gap: 4 }}>
              {/* Company Name */}
              <Box>
                <Typography variant="h6" fontWeight="600" color="#1e293b" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <BusinessIcon color="primary" />
                  Company Name
                </Typography>
                <TextField
                  fullWidth
                  name="name"
                  placeholder="Enter company name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "&:hover fieldset": {
                        borderColor: "#3b82f6",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#3b82f6",
                        borderWidth: 2,
                      },
                    },
                  }}
                />
              </Box>

              {/* Website & Location Row */}
              <Box sx={{ display: "grid", gridTemplateColumns: { md: "1fr 1fr" }, gap: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight="600" color="#1e293b" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LanguageIcon color="primary" />
                    Website
                  </Typography>
                  <TextField
                    fullWidth
                    name="website"
                    placeholder="https://company.com"
                    value={formData.website}
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="h6" fontWeight="600" color="#1e293b" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon color="primary" />
                    Location
                  </Typography>
                  <TextField
                    fullWidth
                    name="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Description */}
              <Box>
                <Typography variant="h6" fontWeight="600" color="#1e293b" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <DescriptionIcon color="primary" />
                  Company Description
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  name="description"
                  placeholder="Describe your company, mission, values, and what makes you unique..."
                  value={formData.description}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      "& textarea": {
                        resize: "vertical",
                      },
                    },
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Tell candidates about your company culture and values
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ 
              display: "flex", 
              gap: 2, 
              justifyContent: "flex-end",
              pt: 3,
              borderTop: "1px solid #e2e8f0"
            }}>
              <Button
                variant="outlined"
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
                  },
                }}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                disabled={loading}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "600",
                  textTransform: "none",
                  bgcolor: "#10b981",
                  boxShadow: "0 4px 14px 0 rgba(16, 185, 129, 0.4)",
                  "&:hover": {
                    bgcolor: "#059669",
                    boxShadow: "0 6px 20px 0 rgba(16, 185, 129, 0.5)",
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
                {loading ? "Saving..." : "Save & Complete Setup"}
              </Button>
            </Box>
          </form>
        </Card>

        {/* Help Text */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mt: 4, 
            borderRadius: 3,
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            textAlign: "center"
          }}
        >
          <Typography variant="body1" color="text.secondary">
            💡 <strong>Pro tip:</strong> A complete company profile increases candidate trust and improves hiring success rates.
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default CompanySetup;