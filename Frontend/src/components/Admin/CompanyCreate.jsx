import React  from "react";
import Navbar from "../shared/Navbar";
import {useState, useEffect} from "react"
import { COMPANY_API_POINT } from "../../utils/Apicall";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "sonner"
const CompanyCreate =()=>{
    const navigate= useNavigate();

 const[companyName, setCompanyName]= useState("");
   const registerCompany =async()=>{
    try{
         const res= await axios.post(`${COMPANY_API_POINT}/register`,{companyName},{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true,
         });
         if(res?.data?.success){
            const companyId= res?.data?.company?._id;
            toast.success(res.data.message,{companyName});
            navigate(`/admin/companies/${companyId}`);
         }
    }catch(error){
        console.log(error);
    }
   }

    return(
        <div>
            <Navbar/>
            <div className="max-w-4xl mx-auto my-5">
                <form onSubmit={(e)=> e.preventDefault()}>
                    <input  className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                     type="text"
                     value={companyName}
                     onChange={(e)=>setCompanyName(e.target.value)}
                     placeholder="Enter Company Name"
                     />

                     <button type="button" onClick={()=>navigate("/admin/companies")} className="my-5 bg-blue-600 text-white rounded hover:bg-blue-700 px-4 py-2 ">Cancel</button>
                     <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mx-5" onClick={registerCompany}>Continue</button>

                     
                </form>

            </div>
        </div>
       
    )
}

export  default CompanyCreate;