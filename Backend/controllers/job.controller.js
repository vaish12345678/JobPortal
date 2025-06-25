import {Job} from "../models/job.model.js";
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


// It supports search by keyword in the job title or description.
//Return all jobs where either the title or the description contains the keyword.like senior dev , junior de
//if we search developer

// export const getAllJobs = async(req,res)=>{
//     try{
//         const keyword= req.query.keyword || " ";
//         const query ={
//             $or:[
//                 {title: {$regex:keyword, $options:"i"}},
//                 {description: {$regex:keyword, $options:"i"}},
                
//             ]
//         };

//         const jobs = await Job.find(query).populate({
//             path:"company"
//         }).sort({createdAt:-1});
//         if(!jobs){
            
//         return  res.status(400).json({
//             message:"job not found",
//             success:false,
//         });
//         }
        
//         return  res.status(200).json({
//             jobs,
//             success:true,
//         });
//     }
//     catch(error){
//         console.log(error);
//     }
// }

//student
export const getJobById= async(req,res)=>{
    try{
        const jobId= req.params.id;
        const job= await Job.findById(jobId);
        if(!job){
            
        return  res.status(400).json({
            message:"job not found",
            success:false,
        });
        }
        
        return  res.status(200).json({
            job,
            success:true,
        });
    }catch(error){
        console.log(error);
    }
};


//how many jobs are created by admin
export const getMyJob= async(req,res)=>{
    try{
       // Gets the admin's user ID from the request (authenticated user).
    //    const adminId= req.id;
         const userId= req.user._id
        
       //Finds all jobs that were created by the admin using the created_by field.
       const job= await Job.find({userId});
        if(!job){
            return  res.status(400).json({
                message:"job not found",
                success:false,
            });
        }
        return  res.status(400).json({
             jobs:[job],
            success:false,
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
