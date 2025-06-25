
import { Application } from "../models/application model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    
    const {jobId, userId} = req.body;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    //find job
    let job = await Job.findById(jobId); // get job from DB
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    //check if user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "you have already applied for job",
        success: false,
      });
    }

    //check if job exists
    job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    }

    //create new application
    const newApplication = await Application.create({
      job: jobId,
      user: userId,
    });
    job.applications.push(newApplication._id);
    //The new application’s _id (newApplication._id) is pushed into this applications array, linking

    await job.save();
    return res.status(200).json({
      message: "Job applied successfully",
      success: true,
     
    });
   
  } catch (error) {
    console.log(error);
  }
};

//
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No application",
        success: false,
      });
    }

    return res.status(200).json({ success: true, application });
  } catch (error) {
    console.error(error);
  }
};

//admin can see how many students are applied
export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(400).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
          message:"server error",
          success:false,

    })
  }
};

//update status pending rej or selected
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status ie req",
        success: false,
      });
    }
    //find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "Application not found",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
