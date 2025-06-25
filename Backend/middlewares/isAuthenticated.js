import jwt from "jsonwebtoken";
import { User } from "../models/user model.js";

const isAuthenticated= async(req, res, next)=>{
    try{
        const token= req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"user not Authenticated",
                success:false,
            })
        }
        //if present
        // const decode=  jwt.verify(token,process.env.SECRET_KEY);//it verifies that token not expired and valid
        // if(!decode){
        //     return res.status(401).json({
        //         message:"inavalid",
        //         success:false,
        //     })
        // };
        // const user = await User.findById(decode.id);
        // //if decode present
        //  req.user = user;
        // req.id=decode.userId;
        // req.role= decode.role;
    const decoded=  jwt.verify(token,process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if(!user){
        return res.status(401).json({
            message:"User not found",
            success:false,
        });
    }

    req.user=user;
    req.id= decoded.id;
    req.role= decoded.role;

        
        next();
    }catch(error){

           console.log(error);
           return res.status(500).json({
            message:"Authentication failed",
            success:false,
            error:error.message,
           });
}
}

export default isAuthenticated


