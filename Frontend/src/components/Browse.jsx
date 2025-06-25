import Navbar from "./shared/Navbar";
import Job from "./Job"

import axios from "axios";
import { useState} from "react";
import {useEffect} from "react";
import { JOB_API_POINT, USER_API_POINT } from "../utils/Apicall";
const Browse=()=>{
    const [randomJobs, setRandomJobs]= useState([]);
     useEffect(()=>{
        const fetchRandomJobs = async ()=>{
            try{
                const res = await axios.get(`${JOB_API_POINT}/get`,{
                    withCredentials:true,
                });
                setRandomJobs(res.data.jobs);
            }
            catch(err){
                console.log("Error fetching jobs", err)
            }
        };
        fetchRandomJobs();
     },[]);

    return(
        <div>
            <Navbar/>
            <div className="max-w-7xl mx-20 my-10">
            
            <br></br>
            <h1 className="font-bold">Search Results: ({randomJobs.length})</h1>
            <br></br>
            <div className="grid grid-cols-3 gap-4">
            {
                randomJobs.map((item)=>{
                    return(
                        <Job key={item._id} job={item}/>
                    )
                })
            }

            </div>
            
        </div>
        </div>
        
    )
}

export default Browse