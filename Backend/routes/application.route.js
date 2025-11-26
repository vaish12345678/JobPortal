import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {applyJob, getApplicant, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router= express.Router();

router.route("/apply/:id").post(isAuthenticated,applyJob);//isAuth = middleware
router.route("/get").get(isAuthenticated,getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated,getApplicant);
router.route("/:id/status").put(isAuthenticated,updateStatus);

//middleware is in between req and res if middleware is true or correct thenonly it passes the conditions
export default router;
//also check for above on postman
