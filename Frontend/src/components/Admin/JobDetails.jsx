import { Box, Typography, Paper, List, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_POINT, APPLICATION_API_POINT } from "../../utils/Apicall";
import Navbar from "../shared/Navbar";
import { toast } from "sonner";
import { Button } from "@mui/material";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicants, setApplicants] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch Job Details
      const res = await axios.get(`${JOB_API_POINT}/${id}/applicants`, {
        withCredentials: true,
      });
      console.log("Applicants:", res.data);

      if (res.data.success) {
        setJob(res.data.job);
        setApplicants(res.data.applicants);
      } else {
        toast.error(res.data.message || "Failed to load job details");
      }

      //Fetch Applicants
      // const appRes = await axios.get(`${APPLICATION_API_POINT}/${id}/applicants`, {
      //   withCredentials: true,
      // });
      //  console.log("Applicants:", appRes.data.applicants);

      // if (appRes.data.success) {
      //   setApplicants(appRes.data.applicants);
      // } else {
      //   toast.error("Failed to fetch applicants");
      // }
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
        toast.success("Status updated");
        // Refresh applicants after update
        setApplicants((prev) =>
          prev.map((app) =>
            app._id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!job) {
    return <Typography variant="h6">Job not found</Typography>;
  }

  return (
    <Box>
      <Navbar />
      <Box sx={{ maxWidth: "800px", mx: "auto", mt: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Company: {job.company?.name}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Posted on: {new Date(job.createdAt).toLocaleDateString()}
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Applicants
          </Typography>
          <List>
            {applicants.length > 0 ? (
              applicants.map((app, index) => (
                <Box key={index} sx={{ p: 1, borderBottom: "1px solid #ccc" }}>
                  <Typography>
                    <strong>Name:</strong> {app.user?.name}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {app.user?.email}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {app.status}
                  </Typography>
                  {app.status === "pending" && (
                    <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => updateStatus(app._id, "accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => updateStatus(app._id, "rejected")}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </Box>
              ))
            ) : (
              <Typography>No applicants yet.</Typography>
            )}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default JobDetails;
