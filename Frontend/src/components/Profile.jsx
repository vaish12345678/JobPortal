
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./shared/Navbar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AppliedJobsTable from "./AppliedJobTable";



const Profile = () => {
  const [resume, setResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    bio: " ",
    email:" ",
    phone: " ",
    skills: " ",
    resume: " ",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/me",{
      withCredentials:true,
    })
      .then((res) => {
        const user= res.data.user;
        setProfileData({
          _id:user._id,
          name:user.fullname,
          bio:user.bio|| "",
          email:user.email,
          phone:user.phoneNumber || "",
          skills:user.skills ? user.skills.join(","):"",
        });
        })
      
      .catch((err) => console.error("Failed to fetch profile", err));
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange=(e)=>{
    setResume(e.target.files[0]);
  }

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

      await axios.put(
        `http://localhost:3000/api/v1/user/profile/update`, 
        formData,
       
        
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
        
       
      );
      console.log("User ID being sent:", userId); // Debug
      setIsEditing(false);
      alert("profile updated successfully");
    } 
    catch (err) {
      console.error("Error saving profile:", err);
      alert("failed to update profile");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        
        {/* Display Profile */}
        <div className="bg-white shadow p-6 rounded-xl relative">
          <div className="flex items-center gap-4">
            <Avatar
              alt="User Avatar"
              src="https://images.unsplash.com/photo-1706426629246-2a3c3e3e3ff2"
              sx={{ width: 96, height: 96 }}
            />
            <div>
              <h1 className="text-xl font-bold">{profileData.name}</h1>
              <p>{profileData.bio}</p>
            </div>
            <IconButton onClick={() => setIsEditing(!isEditing)} className="absolute top-4 right-4">
              <EditIcon />
            </IconButton>
          </div>
          <div className="mt-4 space-y-1">
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>Phone:</strong> {profileData.phone}</p>
            <p><strong>Skills:</strong> {Array.isArray(profileData.skills) ? profileData.skills.join(", ") : profileData.skills}</p>
            <p><strong>Resume:</strong> <a href={`http://localhost:3000/api/v1/user/resume/${profileData._id}`} className="text-blue-600" target="_blank" rel="noreferrer">View Resume</a></p>
          </div>
        </div>

        {/* Form to Edit Profile */}
        {isEditing && (
          <form onSubmit={handleSave} className="bg-gray-100 mt-6 p-6 rounded-xl space-y-4">
            <h2 className="text-lg font-bold">Edit Profile</h2>
            <input
              name="name"
              value={profileData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              className="w-full p-2 border rounded"
            />
            <input
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <input
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full p-2 border rounded"
            />
            <input
              name="skills"
              value={Array.isArray(profileData.skills) ? profileData.skills.join(", ") : profileData.skills}
              onChange={handleInputChange}
              placeholder="Skills (comma separated)"
              className="w-full p-2 border rounded"
            />
            <input
            type="file"
              name="resume"
              
              onChange={handleFileChange}
              placeholder="upload resume"
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        )}

        {/* Jobs Table */}
        <div className="mt-10 bg-white shadow p-6 rounded-xl">
          <AppliedJobsTable />
        </div>
      </div>
    </div>
  );
};

export default Profile;
