import LatestJobCards from "./LatestJobCards";
import axios from "axios";
import {useEffect, useState} from "react";


import {JOB_API_POINT} from "../utils/Apicall";



const LatestJob = () => {
  const [jobs,setJobs] = useState([]);
  const [loading, setLoading]= useState([]);

  useEffect(()=>{
    const fetchLatestJobs = async()=>{
      try{
        const res= await axios.get(`${JOB_API_POINT}/get`,{
          withCredentials:true,
        });
        setJobs(res.data.jobs||[]);
        setLoading(false);
      } catch (err){
        console.log("failed to fetch latest jobs",err);
        setLoading(false);
      }
    };
    fetchLatestJobs();
  }, []);
  return (
    <div className="min-h-screen w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl font-bold text-center mb-10">
          <span className="text-blue-600">Latest & Top </span>
          Job Openings
        </h3>
        {
          loading ? (
            <div className="text-center text-lg"> Loading... </div>
          ) : jobs.length === 0? (
               <div className="text-center text-gray-500">No job openings available.</div>
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {jobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job ={job} />
          ))}
        </div>

          )
        }
       
      </div>
    </div>
  );
};


export default LatestJob;

