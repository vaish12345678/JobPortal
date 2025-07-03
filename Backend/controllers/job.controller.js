import {Job} from "../models/job.model.js";
import { Application } from "../models/application model.js";
//admin posts job
export const postJob= async(req,res)=>{
   try{

    if (req.role !== "recruiter") {
      return res.status(403).json({
        message: "Only recruiters can post jobs",
        success: false,
      });
    }
    const {title, description, requirements,salary
        ,location, jobType, experience  , position, companyId
    }= req.body;
    const userId= req.id;
    if(!title|| !description||!requirements||!salary||
        !location||!jobType||! experience  || !position ||!companyId){

        return  res.status(400).json({
            message:"something is missing",
            success:false,
        });
   }
   const job = await Job.create({
    title, 
    description, 
    requirements:requirements.split(',').map(r => r.trim()),
    salary:Number(salary)
    ,location, 
    jobType, 
    experienceLevel:experience  , 
    position, 
    company:companyId,
    created_by:userId
});
  return res.status(201).json({
    message:"new job created successfully",
    Job,
    success :true,
  });
} catch(error){
    console.log(error);
   }
}

//student
// controllers/jobController.js



export const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company", "name") // just fetch company name
      .populate("created_by", "name email");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Get all applicants for this job
    const applications = await Application.find({ job: job._id })
      .populate("user", "name email contact");

    return res.status(200).json({
      success: true,
      job,
      applicants: applications,
    });
  } catch (error) {
    console.error("Error in getSingleJob:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


//how many jobs are created by admin
export const getMyJob= async(req,res)=>{
    try{
       // Gets the admin's user ID from the request (authenticated user).
    //    const adminId= req.id;
         const userId= req.user._id
        
       //Finds all jobs that were created by the admin using the created_by field.
       const jobs = await Job.find({ created_by: userId });

        if(!jobs){
            return  res.status(400).json({
                message:"job not found",
                success:false,
            });
        }
        return  res.status(200).json({
             jobs,
            success:true,
        });
    }
catch(error){
    console.log(error);
}
}


export const getAllJobs=async(req,res)=>{
    try{
        const jobs = await Job.find().populate("company","name");
        return res.status(200).json({
            message:"jobs fetched successfully",
            jobs,
            success:true,
        });
    }catch(error){
         return res.status(500).json({
      message: "Server error",
      success: false,
    });
    }
}

