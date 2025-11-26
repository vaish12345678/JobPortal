import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { AccountCircle, Logout, WorkOutline } from "@mui/icons-material";
import axios from "axios";
import { USER_API_POINT } from "../../utils/Apicall";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  const getUserData = async () => {
    try {
      const res = await axios.get(`${USER_API_POINT}/me`, {
        withCredentials: true,
      });
      console.log(res.data.user);

      if (res.data.success) {
        setUser(res.data.user);
        setRole(res.data.user.role);
      }
    } catch (err) {
      console.log("User not logged in");
    }
  };

  const handleLogout = async () => {
    console.log("logout button clicked");
    try {
      const res = await axios.get(`${USER_API_POINT}/logout`, {
        withCredentials: true,
      });
      console.log("logout response", res.data);
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <WorkOutline className="text-blue-600 text-3xl" />
          <h2 className="text-2xl font-bold">
            <span className="text-blue-600">Job</span>
            <span className="text-green-600">Portal</span>
          </h2>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-lg font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link 
                  to="/admin/companies" 
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/jobs" 
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50"
                >
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/jobs" 
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link 
                  to="/browse" 
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-blue-50"
                >
                  Browse
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex gap-3">
              {user.role === "student" && (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-blue-600 font-semibold border-2 border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                >
                  <AccountCircle fontSize="small" /> 
                  View Profile
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 font-semibold border-2 border-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm"
              >
                <Logout fontSize="small" /> 
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <button className="border-2 border-blue-600 text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="border-2 border-green-600 text-green-600 font-semibold px-6 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-200 shadow-sm">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;