import mongoose from "mongoose";

const applicationSchema= new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },
    //The ref option is used to tell Mongoose that this field is a reference to a document in the Job collection. W
    // hen you populate this field, Mongoose will fetch the full job document associated with this ObjectId.
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
    type:String,
    enum:["pending","accepted","rejected"],
    default:"pending",
    },

},{timestamps:true});

export const Application= mongoose.model("Application",applicationSchema);
    