import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";

import LatestJob from "./LatestJob";
import Footer from "./Footer";
import { useEffect ,useState} from "react";
import {useNavigate} from "react-router-dom"

const Home=()=>{
    
    const [user,setUser]= useState (null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUser= async()=>{
            try{
                const res= await axios.get("http://localhost:3000/api/v1/user/me",{
                    withCredential:true,
                });
                setUser(res.data.user);
                if(res.data.user.role === "recruiter"){
                    navigate("/admin/companies");
                }
                    
                
            }catch(error){
                console.log(error.message);
            }
        };
        fetchUser();
    },[]);
    
    return(
        <div>
            <Navbar/>
            <HeroSection/>
            {/* <CategoryCarousel/> */}
            <LatestJob/>
            <Footer/>
           
        </div>
    )
}
export default Home;

// import Navbar from "./shared/Navbar";
// import HeroSection from "./HeroSection";
// import LatestJob from "./LatestJob";
// import Footer from "./Footer";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Box, CircularProgress, Alert, Typography } from "@mui/material"; // ✅ Added Typography


// const Home = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const res = await axios.get("http://localhost:3000/api/v1/user/me", {
//                     withCredentials: true, // ✅ Fixed typo: withCredential -> withCredentials
//                 });
                
//                 if (res.data.user) {
//                     setUser(res.data.user);
//                     if (res.data.user.role === "recruiter") {
//                         navigate("/admin/companies");
//                     }
//                 }
//             } catch (error) {
//                 console.error("User fetch error:", error.message);
//                 setError("Failed to load user data");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     }, [navigate]);

//     // Show loading state
//     if (loading) {
//         return (
//             <Box sx={{ 
//                 display: "flex", 
//                 justifyContent: "center", 
//                 alignItems: "center", 
//                 height: "100vh",
//                 flexDirection: "column",
//                 gap: 2
//             }}>
//                 <CircularProgress size={50} />
//                 <Typography variant="h6" color="text.secondary">
//                     Loading...
//                 </Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ 
//             minHeight: "100vh",
//             background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)"
//         }}>
//             <Navbar user={user} />
//             <HeroSection />
            
//             {/* Error Alert */}
//             {error && (
//                 <Box sx={{ px: 3, mt: 2 }}>
//                     <Alert severity="error" sx={{ borderRadius: 2 }}>
//                         {error}
//                     </Alert>
//                 </Box>
//             )}
            
//             {/* Main Content */}
//             <Box component="main" sx={{ py: 6 }}>
//                 <LatestJob />
//             </Box>
            
//             <Footer />
//         </Box>
//     );
// };

// export default Home;