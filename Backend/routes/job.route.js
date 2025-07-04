import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getMyJob, getAllJobs, getSingleJob, postJob } from "../controllers/job.controller.js";

const router= express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/getadminjobs").get(isAuthenticated,getMyJob);
router.route("/:id/applicants").get(isAuthenticated,getSingleJob);

//middleware is in between req and res if middleware is true or correct thenonly it passes the conditions
export default router;