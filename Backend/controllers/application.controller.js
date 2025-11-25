import { Application } from "../models/application model.js";
import { Job } from "../models/job.model.js";


export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id; // from isAuthenticated middleware

    if (!jobId) {
      return res.status(400).json({ message: "Job id is required", success: false });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      user: userId,
    });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job", success: false });
    }

    // Create new application
    const newApplication = await Application.create({
      job: jobId,
      user: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(200).json({ message: "Job applied successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};




export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ user: userId }) // corrected from applicant -> user
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select:"name",
        },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No applications found", success: false });
    }

    return res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};
export const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;

  //  const applications = await Application.find({ job: jobId }).populate("user", "fullname email");
  // Remove field selection to get all user fields
const applications = await Application.find({ job: jobId }).populate("user");
    return res.status(200).json({
      success: true,
      applicants: applications,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({ message: "Status is required", success: false });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found", success: false });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({ message: "Status updated successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};



















