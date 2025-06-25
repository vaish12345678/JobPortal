import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { AccountCircle, Logout } from "@mui/icons-material";
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
      setUser(null); // Clear user data on logout
      console.log("User state cleared, navigating...");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-white shadow sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 h-20">
        <Link to="/">
          <h2 className="text-3xl font-bold">
            <span className="text-blue-600">Job</span>
            <span className="text-green-600">Portal</span>
          </h2>
        </Link>

        <ul className="flex items-center gap-6 text-lg text-gray-700 font-medium">
          {user && user.role === "recruiter" ? (
            <>
              <li>
                <Link to="/admin/companies">Companies</Link>
              </li>
              <li>
                <Link to="/admin/jobs">Jobs</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/browse">Browse</Link>
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex gap-4">
              {user.role == "student" && (
                <Link
                  to="/profile"
                  className="flex items-center text-blue-600 font-medium border border-blue-600 px-4 py-1 rounded-md hover:bg-blue-50"
                >
                  <AccountCircle fontSize="small" /> View Profile
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 font-medium border border-red-600 px-4 py-1 rounded-md hover:bg-red-50"
              >
                <Logout fontSize="small" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="border border-blue-600 text-blue-600 px-4 py-1 rounded-md hover:bg-blue-50">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-green-600 text-green-600 px-4 py-1 rounded-md hover:bg-green-50">
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
