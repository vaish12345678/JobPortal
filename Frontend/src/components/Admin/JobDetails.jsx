

import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  Card,
  Avatar,
  Chip,
  Modal,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_POINT, APPLICATION_API_POINT } from "../../utils/Apicall";
import Navbar from "../shared/Navbar";
import { toast } from "sonner";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionIcon from "@mui/icons-material/Description";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [jobRes, applicantsRes] = await Promise.all([
        axios.get(`${JOB_API_POINT}/${id}/applicants`, {
          withCredentials: true,
        }),
        axios.get(`${APPLICATION_API_POINT}/${id}/applicants`, {
          withCredentials: true,
        }),
      ]);

      if (jobRes.data.success) {
        setJob(jobRes.data.job);
      }

      if (applicantsRes.data.success) {
        setApplicants(applicantsRes.data.applicants);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const updateStatus = async (applicationId, newStatus) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_POINT}/${applicationId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(`Application ${newStatus} successfully`);
        setApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!job) {
    return (
      <Box>
        <Navbar />
        <Typography variant="h6" textAlign="center" mt={4}>
          Job not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Box sx={{ maxWidth: "800px", mx: "auto", p: 3 }}>
        {/* Job Header */}
        <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            {job.title}
          </Typography>
          <Typography variant="body1">Company: {job.company?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Posted on: {new Date(job.createdAt).toLocaleDateString()}
          </Typography>
        </Card>

        {/* Applicants */}
        <Card sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Applicants ({applicants.length})
          </Typography>

          {applicants.length > 0 ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {applicants.map((app, index) => (
                <Paper
                  key={index}
                  sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar sx={{ width: 50, height: 50 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          {app.user?.fullname || "Not available"}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <EmailIcon fontSize="small" />
                          {app.user?.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={app.status.toUpperCase()}
                      color={getStatusColor(app.status)}
                      variant={app.status === "pending" ? "outlined" : "filled"}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Button
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewProfile(app.user)}
                      sx={{ borderRadius: 2 }}
                    >
                      View Profile
                    </Button>

                    {app.status === "pending" && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => updateStatus(app._id, "accepted")}
                          sx={{ borderRadius: 2 }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => updateStatus(app._id, "rejected")}
                          sx={{ borderRadius: 2 }}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <PersonIcon
                sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
              />
              <Typography variant="h6" color="text.secondary">
                No applicants yet
              </Typography>
            </Box>
          )}
        </Card>

        {/* User Profile Modal */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight="600">
                Candidate Profile
              </Typography>
              <IconButton onClick={() => setModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            {selectedUser && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ width: 60, height: 60 }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight="600">
                      {selectedUser.fullname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2">
                    <strong>Phone:</strong>{" "}
                    {selectedUser.phoneNumber || "Not provided"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Skills:</strong>{" "}
                    {selectedUser.profile?.skills?.join(", ") ||
                      "No skills listed"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Bio:</strong>{" "}
                    {selectedUser.profile?.bio || "No bio provided"}
                  </Typography>
                </Box>

                {selectedUser.profile?.resume && (
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<DescriptionIcon />}
                    onClick={() =>
                      window.open(
                        `https://docs.google.com/gview?url=${encodeURIComponent(
                          selectedUser.profile.resume
                        )}&embedded=true`,
                        "_blank"
                      )
                    }
                  >
                    View Resume
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default JobDetails;
