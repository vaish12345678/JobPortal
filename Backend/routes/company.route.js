import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {getMyCompany, getCompanyById, registerCompany, updateCompany,getAllCompanies} from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";
const router= express.Router();

router.route("/register").post(isAuthenticated,registerCompany);//isAuth = middleware
router.route("/my").get(isAuthenticated,getAllCompanies);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateCompany);
router.route("/get").get(getAllCompanies);

//middleware is in between req and res if middleware is true or correct thenonly it passes the conditions
export default router;
//also check for above on postman
