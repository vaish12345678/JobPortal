
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AppliedJobsTable from "./AppliedJobTable";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import { USER_API_POINT } from "../utils/Apicall";
const Profile = () => {
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    bio: "",
    email: "",
    phone: "",
    skills: "",
    resume: "",
  });

  useEffect(() => {
    axios.get(`${USER_API_POINT}/me`, {
      withCredentials: true,
    })
    .then((res) => {
      const user = res.data.user;
      console.log("🔍 Full user data:", user);
      
      setProfileData({
        _id: user._id,
        name: user.fullname,
        bio: user.profile?.bio || "",
        email: user.email,
        phone: user.phoneNumber || "",
        skills: user.profile?.skills ? user.profile.skills.join(",") : "",
        resume: user.profile?.resume || ""
      });
    })
    .catch((err) => console.error("Failed to fetch profile", err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("fullname", profileData.name);
      formData.append("bio", profileData.bio);
      formData.append("email", profileData.email);
      formData.append("phoneNumber", profileData.phone);
      formData.append("skills", profileData.skills);
      
      if (resume) {
        formData.append("resume", resume);
      }

      console.log("🔍 Sending form data...");

      const response = await axios.put(
        `${USER_API_POINT}/profile/update`, 
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      
      console.log("✅ Update response:", response.data);
      
      // Refresh the profile data
      const userRes = await axios.get(`${USER_API_POINT}/me`, {
        withCredentials: true,
      });
      
      const updatedUser = userRes.data.user;
      setProfileData({
        _id: updatedUser._id,
        name: updatedUser.fullname,
        bio: updatedUser.profile?.bio || "",
        email: updatedUser.email,
        phone: updatedUser.phoneNumber || "",
        skills: updatedUser.profile?.skills ? updatedUser.profile.skills.join(",") : "",
        resume: updatedUser.profile?.resume || ""
      });
      
      setIsEditing(false);
      setResume(null);
      alert("Profile updated successfully!");
    } 
    catch (err) {
      console.error("❌ Error saving profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        
        {/* Display Profile */}
        <div className="bg-white shadow-lg rounded-2xl p-8 relative border border-gray-100">
          <div className="flex items-start gap-6">
            <Avatar
              alt="User Avatar"
              src="https://images.unsplash.com/photo-1706426629246-2a3c3e3e3ff2"
              sx={{ 
                width: 120, 
                height: 120,
                border: "4px solid #f3f4f6"
              }}
              className="shadow-md"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{profileData.name || "Your Name"}</h1>
                  <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
                    {profileData.bio || "Add a bio to tell others about yourself..."}
                  </p>
                </div>
                <IconButton 
                  onClick={() => setIsEditing(!isEditing)} 
                  className="bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                  sx={{ 
                    border: "2px solid #dbeafe",
                    '&:hover': { border: "2px solid #93c5fd" }
                  }}
                >
                  <EditIcon className="text-blue-600" />
                </IconButton>
              </div>
              
              {/* Profile Details Grid */}
              <div className="mt-8 grid gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <EmailIcon className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{profileData.email || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <PhoneIcon className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{profileData.phone || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CodeIcon className="text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Skills</p>
                    <p className="font-medium text-gray-900">
                      {profileData.skills ? (
                        <span className="flex flex-wrap gap-1">
                          {profileData.skills.split(',').map((skill, index) => (
                            <span 
                              key={index}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                        </span>
                      ) : (
                        "No skills added"
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <DescriptionIcon className="text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Resume</p>
                    {profileData.resume ? (
                      <a 
                        href={`https://docs.google.com/gview?url=${encodeURIComponent(profileData.resume)}&embedded=true`}
                        className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        📄 View Resume
                      </a>
                    ) : (
                      <span className="text-gray-500 italic">No resume uploaded</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form to Edit Profile */}
        {isEditing && (
          <form onSubmit={handleSave} className="bg-white shadow-lg mt-8 p-8 rounded-2xl space-y-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <PersonIcon className="text-blue-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
                <input
                  type="file"
                  name="resume"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills <span className="text-gray-500 text-xs">(comma separated)</span>
              </label>
              <input
                name="skills"
                value={profileData.skills}
                onChange={handleInputChange}
                placeholder="e.g., JavaScript, React, Node.js, Python"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex-1 shadow-md"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors duration-200 flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Jobs Table */}
        <div className="mt-10 bg-white shadow-lg p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6"></h2>
          <AppliedJobsTable />
        </div>
      </div>
    </div>
  );
};

export default Profile;