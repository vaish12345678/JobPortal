import express from "express";
const app=express();
import dotenv from "dotenv";
dotenv.config({});

import cookieParser from "cookie-parser";//converts into js object
import cors from "cors";

import connectDb from "./utils/db.js";
import userRoutes from "./routes/user.routes.js"
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js"

import profileRoutes from "./routes/profile.js";


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/home",(req,res)=>{
    res.send("i am coming from backend");
});

// const corsOptions={
//     origin:"http://localhost:5173",//frontend server connect to apis
//     credentials:true
// }

// app.use(cors(corsOptions));


// const corsOptions = {
//   origin: ["http://localhost:5173", "https://effulgent-gelato-4f5d9e.netlify.app/"],
//   credentials: true
// };
//  app.use(cors(corsOptions));

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://effulgent-gelato-4f5d9e.netlify.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // allow cookies
}));

// Handle preflight for all routes
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));


//apis
app.use("/api/v1/user",userRoutes);
//https/localhost:3000/register same fro login and update
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job",jobRoutes);
app.use("/api/v1/application",applicationRoutes);
app.use("/api/profile", profileRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    connectDb();
    console.log("app is listening on port 3000");
})
