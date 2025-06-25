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
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { COMPANY_API_POINT } from "../../utils/Apicall";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CompaniesTable = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const[search, setSearch]= useState("");
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
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2, mt: 4 }}>
       <TextField
      
        label="Search by Company Name"
        variant="outlined"
        
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
       
          <button onClick={()=> navigate("/admin/companies/create")}
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition mx-5 my-5"
          >
            New Company
          </button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f1f5f9" }}>
            <TableRow>
              <TableCell>
                <strong>Logo</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body1" color="text.secondary">
                    No companies found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>
                    <Avatar alt={company.name} src={company.logo || ""} />
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>
                    {company.createdAt
                      ? new Date(company.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
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
  );
};

export default CompaniesTable;
