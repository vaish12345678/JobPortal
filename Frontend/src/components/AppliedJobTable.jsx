// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Chip,
//   } from "@mui/material";
//   const appliedJobs = [
//     {
//       id: 1,
//       title: "Frontend Developer",
//       company: "Google",
//       dateApplied: "2025-05-05",
//       status: "Under Review",
//     },
//     {
//       id: 2,
//       title: "Backend Developer",
//       company: "Amazon",
//       dateApplied: "2025-05-06",
//       status: "Interview Scheduled",
//     },
//     {
//       id: 3,
//       title: "Full Stack Developer",
//       company: "Microsoft",
//       dateApplied: "2025-05-07",
//       status: "Rejected",
//     },
//   ];
  
//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Under Review":
//         return "warning";
//       case "Interview Scheduled":
//         return "success";
//       case "Rejected":
//         return "error";
//       default:
//         return "default";
//     }
//   };
  
//   const AppliedJobsTable = () => {
//     return (
//       <div className="p-4">
//         <h2 className="text-lg font-bold my-5">Applied Jobs</h2>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow className="bg-gray-200">
//                 <TableCell><strong>Job Title</strong></TableCell>
//                 <TableCell><strong>Company</strong></TableCell>
//                 <TableCell><strong>Date Applied</strong></TableCell>
//                 <TableCell><strong>Status</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {appliedJobs.map((job) => (
//                 <TableRow key={job.id}>
//                   <TableCell>{job.title}</TableCell>
//                   <TableCell>{job.company}</TableCell>
//                   <TableCell>{job.dateApplied}</TableCell>
//                   <TableCell>
//                     <Chip label={job.status} color={getStatusColor(job.status)} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     );
//   };
  
//   export default AppliedJobsTable;


// AppliedJobTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const appliedJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    dateApplied: "2025-05-05",
    status: "Selected",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Amazon",
    dateApplied: "2025-05-06",
    status: "Interview Scheduled",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Microsoft",
    dateApplied: "2025-05-07",
    status: "Rejected",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Under Review":
      return "warning";
    case "Interview Scheduled":
      return "success";
    case "Rejected":
      return "error";
    case "Selected":
      return "primary"
    default:
      return "default";
  }
};

const AppliedJobsTable = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell><strong>Job Title</strong></TableCell>
              <TableCell><strong>Company</strong></TableCell>
              <TableCell><strong>Date Applied</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliedJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.dateApplied}</TableCell>
                <TableCell>
                  <Chip label={job.status} color={getStatusColor(job.status)} />
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
