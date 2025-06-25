import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import axios from "axios";
import {useState} from "react";
import {useEffect} from "react";
import {JOB_API_POINT} from "../utils/Apicall";


const Jobs= ()=>{
  const [jobs, setJobs]= useState([]);
  const [loading , setLoading] = useState(true);

   useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_POINT}/get`,{
        withCredentials:true
        }) // adjust if needed
         console.log("api response", res.data);
        setJobs(res.data.jobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs", error);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

   return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 flex gap-5">
        
          <div className="w-1/5"> {/* Corrected to w-1/5 for proper width */}
            <FilterCard />
          </div>
           
           <div className="flex-1">
          {
            loading ? (
              <div>Loading jobs... </div>
            ): jobs.length === 0 ? (
              <span>Job not Found</span>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
            )
          }
         
        
        </div>
      </div>
    </div>
  );
}




export default Jobs;
