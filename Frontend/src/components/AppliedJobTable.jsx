
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_POINT } from "../utils/Apicall";
import { toast } from "sonner";

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "under review":
      return "warning";
    case "interview scheduled":
      return "success";
    case "rejected":
      return "error";
    case "selected":
      return "primary";
    default:
      return "default";
  }
};

const AppliedJobsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_POINT}/get`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setApplications(res.data.applications);
      } else {
        toast.error("Failed to load applications");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f0f0f0" }}>
              <TableCell><strong>Job Title</strong></TableCell>
              <TableCell><strong>Company</strong></TableCell>
              <TableCell><strong>Date Applied</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app._id}>
                <TableCell>{app.job?.title || "N/A"}</TableCell>
                <TableCell>{app.job?.company?.name || "N/A"}</TableCell>
                <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip label={app.status} color={getStatusColor(app.status)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AppliedJobsTable;
