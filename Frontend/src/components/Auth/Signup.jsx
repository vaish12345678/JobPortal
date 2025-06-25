import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";

import axios from "axios";
import { toast } from "sonner"; // if you're using sonner
import { USER_API_POINT } from "../../utils/Apicall";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "student", // default role is student
    file: "",
  });

  const changeFileHandler = (e) => {
    setFormData({ ...formData, file: e.target.files?.[0] });
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRoleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value, // update role based on radio button selection
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    const Data = new FormData();
    Data.append("fullname", formData.fullname);
    Data.append("email", formData.email);
    Data.append("password", formData.password);
    Data.append("phoneNumber", formData.phoneNumber);
    Data.append("role", formData.role);
    Data.append("photo", formData.file); // this is your image file

    // Add API call for signup here
    try {
      const res = await axios.post(`${USER_API_POINT}/register`, Data, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    // redirect to login after signup
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="fullname"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="Number"
                name="phoneNumber"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1234XXXXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Role Selection */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">Role</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="student"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  <label htmlFor="student" className="text-blue-600">
                    Student
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="recruiter"
                    name="role"
                    value="recruiter"
                    checked={formData.role === "recruiter"}
                    onChange={handleRoleChange}
                    className="mr-2"
                  />
                  <label htmlFor="recruiter" className="text-blue-600">
                    Recruiter
                  </label>
                </div>
              </div>
            </div>

            {/* File Upload - outside the radio group */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">Profile Picture</label>
              <input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="w-full text-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
