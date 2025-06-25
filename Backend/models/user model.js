import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

    role:{
        type:String,
        enum:['student','recruiter'],
        required:true,
    },
    profile:{
        bio:{
            type:String,
        },
        skills:[{type:String}], //array of skills
        resume:{
            type:String
        },
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId , ref:'company'},//id stores an relation it
        //it tells us that in which company user is working
        profilePhoto:{
            type:String,
            default: "",
        }
    }

},{timestamps:true});// automatically added createdAt and udatedAt in mongo

export const User = mongoose.model("User",userSchema);