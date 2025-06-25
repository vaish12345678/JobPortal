// // routes/profile.js
// import express from "express";
// import { getProfile, updateProfile } from "../controllers/profile.controller.js";

// const router = express.Router();

// router.get("/", getProfile);
// router.put("/", updateProfile);

// export default router;
import express from "express";

import { updateProfile } from "../controllers/profile.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.put("/update/:id",isAuthenticated,singleUpload, updateProfile);  // Use this route to handle profile updates

export default router;

