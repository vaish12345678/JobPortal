import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {register,login,logout,updateProfile} from "../controllers/user controller.js";
const router= express.Router();
import {singleUpload} from "../middlewares/multer.js"
import { getMyProfile } from "../controllers/user controller.js";

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated,singleUpload,updateProfile);


//middleware is in between req and res if middleware is true or correct thenonly it passes the conditions
export default router;



