
// import Navbar from "../shared/Navbar";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
 
//   Button,
//   Typography,
//   TextField,
//   CircularProgress,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { JOB_API_POINT } from "../../utils/Apicall";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const fetchJobs = async () => {
//     try {
//       const res = await axios.get(`${JOB_API_POINT}/get`, {
//         withCredentials: true,
//       });

//       if (res?.data?.success && Array.isArray(res.data.jobs)) {
//         setJobs(res.data.jobs);
//         toast.success(res.data.message || "Jobs  fetched successfully");
//       } else {
//         setJobs([]);
//         toast.error(res.data.message || "Failed to fetch jobs");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       toast.error("Something went wrong while fetching jobs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const filteredJobs = jobs.filter((job) =>
//     job.title.toLowerCase().includes(search.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, mt: 4 }}>
//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{ fontWeight: "bold", mb: 2 }}
//         >
//             Jobs
//           </Typography>
//         <TextField
//           label="Search by Company Name"
//           variant="outlined"
//           margin="normal"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         <button
//           onClick={() => navigate("/admin/jobs/create")}
//           type="submit"
//           className="bg-black text-white px-6 py-2 rounded-lg font-semibold  transition mx-5 my-5"
//         >
//           New Job
//         </button>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
//               <TableRow>
//                 <TableCell>
//                   <strong>Company Name </strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Role</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Date</strong>
//                 </TableCell>
//                 <TableCell>
//                   <strong>Action</strong>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {jobs?.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">
//                     <Typography variant="body1" color="text.secondary">
//                       No jobs found.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredJobs.map((job) => (
//                   <TableRow key={job._id}>
                    
//                     <TableCell>{job.company?.name}</TableCell>
//                     <TableCell>{job.title}</TableCell>
                  
//                     <TableCell>
//                       {job.createdAt
//                         ? new Date(job.createdAt).toLocaleDateString()
//                         : "N/A"}
//                     </TableCell>

//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={() =>
//                           navigate(`/admin/jobs/${job._id}`)
//                         }
//                       >
//                         View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </div>
//   );
// };

// export default Jobs;
import Navbar from "../shared/Navbar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Chip,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { JOB_API_POINT } from "../../utils/Apicall";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WorkIcon from "@mui/icons-material/Work";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_POINT}/get`, {
        withCredentials: true,
      });

      if (res?.data?.success && Array.isArray(res.data.jobs)) {
        setJobs(res.data.jobs);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <div>
      <Navbar />
      <Box sx={{ maxWidth: "1200px", mx: "auto", px: 3, py: 3 }}>
        
        {/* Header Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight="600" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WorkIcon color="primary" />
            Job Listings
          </Typography>
          <Chip 
            label={`${filteredJobs.length} jobs`} 
            color="primary" 
            variant="outlined"
            size="small"
          />
        </Box>

        {/* Search and Action Bar */}
        <Card sx={{ p: 2, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              size="small"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: <SearchIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />,
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/admin/jobs/create")}
              size="small"
              sx={{ 
                borderRadius: 1,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              New Job
            </Button>
          </Box>
        </Card>

        {/* Jobs Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "600", py: 2 }}>Company</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600", py: 2 }}>Role</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600", py: 2 }}>Date Posted</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "600", py: 2 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      {search ? "No jobs match your search" : "No jobs found"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job) => (
                  <TableRow 
                    key={job._id}
                    sx={{ 
                      '&:hover': { 
                        backgroundColor: '#f8fafc' 
                      } 
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" fontWeight="500">
                        {job.company?.name || "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" fontWeight="500">
                        {job.title}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {job.createdAt
                          ? new Date(job.createdAt).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        sx={{ 
                          borderRadius: 1,
                          textTransform: "none",
                          fontSize: "0.875rem"
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
      </Box>
    </div>
  );
};

export default Jobs;