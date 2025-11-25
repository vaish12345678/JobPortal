// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../shared/Navbar";

// import axios from "axios";
// import { toast } from "sonner"; // if you're using sonner
// import { USER_API_POINT } from "../../utils/Apicall";

// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     role: "student", // default role is student
//     file: "",
//   });

//   const changeFileHandler = (e) => {
//     setFormData({ ...formData, file: e.target.files?.[0] });
//   };
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleRoleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       role: e.target.value, // update role based on radio button selection
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Signup Data:", formData);
//     const Data = new FormData();
//     Data.append("fullname", formData.fullname);
//     Data.append("email", formData.email);
//     Data.append("password", formData.password);
//     Data.append("phoneNumber", formData.phoneNumber);
//     Data.append("role", formData.role);
//     Data.append("photo", formData.file); // this is your image file

//     // Add API call for signup here
//     try {
//       const res = await axios.post(`${USER_API_POINT}/register`, Data, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     }
//     // redirect to login after signup
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
//         <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//             Create an Account
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-medium">Name</label>
//               <input
//                 type="text"
//                 name="fullname"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="John Doe"
//                 value={formData.fullname}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="example@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-medium">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1 font-medium">Phone Number</label>
//               <input
//                 type="Number"
//                 name="phoneNumber"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="1234XXXXXX"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Role Selection */}
//             <div className="mt-4">
//               <label className="block mb-1 font-medium">Role</label>
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id="student"
//                     name="role"
//                     value="student"
//                     checked={formData.role === "student"}
//                     onChange={handleRoleChange}
//                     className="mr-2"
//                   />
//                   <label htmlFor="student" className="text-blue-600">
//                     Student
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id="recruiter"
//                     name="role"
//                     value="recruiter"
//                     checked={formData.role === "recruiter"}
//                     onChange={handleRoleChange}
//                     className="mr-2"
//                   />
//                   <label htmlFor="recruiter" className="text-blue-600">
//                     Recruiter
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* File Upload - outside the radio group */}
//             <div className="mt-4">
//               <label className="block mb-1 font-medium">Profile Picture</label>
//               <input
//                 accept="image/*"
//                 type="file"
//                 onChange={changeFileHandler}
//                 className="w-full text-gray-700"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
//             >
//               Sign Up
//             </button>
//           </form>
//           <p className="mt-4 text-sm text-center">
//             Already have an account?{" "}
//             <span
//               onClick={() => navigate("/login")}
//               className="text-blue-600 cursor-pointer hover:underline"
//             >
//               Login
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_POINT } from "../../utils/Apicall";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post(`${USER_API_POINT}/register`, formData, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen px-4 py-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">Create Account</h2>
            <p className="text-gray-600">Join us today and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full Name"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email Address"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Phone Number"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a</label>
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleRoleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                    Student
                  </span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={formData.role === "recruiter"}
                    onChange={handleRoleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-gray-700 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    Recruiter
                  </span>
                </label>
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 font-semibold hover:text-blue-700 hover:underline focus:outline-none"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;