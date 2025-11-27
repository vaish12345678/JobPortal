// import axios from "axios";
// import Navbar from "./shared/Navbar";
// import HeroSection from "./HeroSection";

// import LatestJob from "./LatestJob";
// import Footer from "./Footer";
// import { useEffect ,useState} from "react";
// import {useNavigate} from "react-router-dom"
// import { USER_API_POINT } from "../utils/Apicall";


// const Home=()=>{
    
//     const [user,setUser]= useState (null);
//     const navigate = useNavigate();

//     useEffect(()=>{
//         const fetchUser= async()=>{
//             try{
//                 const res = await axios.get(
//   `${USER_API_POINT}/me`,
//   {
//     withCredentials: true,
//   }
// );

//                 setUser(res.data.user);
//                 if(res.data.user.role === "recruiter"){
//                     navigate("/admin/companies");
//                 }
                    
                
//             }catch(error){
//                 console.log(error.message);
//             }
//         };
//         fetchUser();
//     },[]);
    
//     return(
//         <div>
//             <Navbar/>
//             <HeroSection/>
//             {/* <CategoryCarousel/> */}
//             <LatestJob/>
//             <Footer/>
           
//         </div>
//     )
// }
// export default Home;
import axios from "axios";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { USER_API_POINT } from "../utils/Apicall";  

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_POINT}/me`, {
          withCredentials: true,
        });

        setUser(res.data.user);

        if (res.data.user.role === "recruiter") {
          navigate("/admin/companies");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <LatestJob />
      <Footer />
    </div>
  );
};
export default Home;
