import mongoose from "mongoose"

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String,
      
    }],
    experienceLevel :{
           type:Number,
           required:true,
    },
   salary:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },

    jobType:{
        type:String,
        required:true,
    },

    position:{
        type:String,
        required:true,
    },

    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true,
    },

    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },// This field tells you who created the job listing (e.g., the employer or recruiter). 
    // //It stores the user's ID who created the listing.

    applications:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Application',
    },
   
],
 applicationCount:{
        type:Number,
        default:0,
    }
      
    

},{timestamps:true});

export const Job = mongoose.model("Job",jobSchema);