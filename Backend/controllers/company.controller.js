import {Company} from "../models/company model.js"
import cloudinary from "../utils/cloudinary.js";
export const registerCompany= async(req,res)=>{

    try{
        const {companyName}= req.body;
        if(!companyName){
            return  res.status(400).json({
                message:"something is missing",
                success:false,
            });
        }
        let company=await Company.findOne({name:companyName});//This checks if a company with the same name already exists in your MongoDB.
        //company found and unique
        if(company){
            return  res.status(400).json({
                message:"you cant registerd same company",
                success:false,
            });
        };
        company= await Company.create({
            name:companyName,
            userId:req.id

        });
        return res.status(201).json({
          message:"company registerd succesfulluly",
          company,//return company
          success:true,
        });
    }catch(error){
        console.log(error);
    }
}
//डॅशबोर्डवर युजरची कंपनी माहिती दाखवण्यासाठी.

//किंवा युजरला स्वतःची कंपनी अपडेट किंवा डिलीट करण्यासाठी.
export const getMyCompany= async(req,res)=>{
    try{
        const userId= req.user._id;//logged in user id
          console.log("req.user:", req.user); // ✅ check if this exists
        const company= await Company.findOne({userId});
        if(!company){
            return res.status(400).json({
                message:"company not found",
                success:false,
            })
        }
        return res.status(200).json({
            message:"company found",
            companies:[company],
            success:true,
        });

    }catch(error){
        console.log(error);
    }
}

export const getCompanyById = async(req,res)=>{
    try{
        const companyId= req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(400).json({
                message:"company not found",
                success:false,
            })
        }return res.status(200).json({
            company,
            success:true,
        });
    }
    catch(error){
        console.log(error)
    }
}


export const updateCompany= async(req,res)=>{
  try{
    const {name,description,website,location}=req.body;
    const file=req.file//for company logo
    
    //cloudinarry ayega
     const updateData= {name,description,website,location};
       // If logo uploaded, handle it (e.g., upload to Cloudinary)
     if (file) {
      const fileUri = getDataUri(file);
      const upload = await cloudinary.uploader.upload(fileUri.content, {
        folder: "logos",
      });
      updateData.logo = upload.secure_url;
    }

     const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new :true})
    
     if(!company){
        return res.status(400).json({
            message:"Company not found",
            success:fail,
        });

     }return res.status(200).json({
            message:"Company Info Updated",
            company,
            success:true,
        });
  }catch(error){
    console.log(error);
  }
}


export const getAllCompanies=async(req,res)=>{
    try{
        const companies = await Company.find();
        return res.status(200).json({
            message:"Companies fetched successfully",
            companies,
            success:true,
        });
    }catch(error){
         return res.status(500).json({
      message: "Server error",
      success: false,
    });
    }
}

// Feature	         CompanyModel	                     JobModel
// Purpose	        Stores info about the company	   |   Stores job details
// Example Fields	name, email, location,             | title, description, salary, jobType, companyId
//                   website, logo	

// Relationship   	One-to-many (Company → Jobs)	      Belongs to a company

