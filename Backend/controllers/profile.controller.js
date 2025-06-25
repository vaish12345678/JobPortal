// controllers/profile.controller.js

let userProfile = {
    name: "Your Name",
    bio: "Your bio here",
    email: "your@email.com",
    phone: "1234567890",
    skills: ["JavaScript", "React"],
    resume: ""
  };
  
  export const getProfile = (req, res) => {
    res.json(userProfile);
  };
  
  export const updateProfile = (req, res) => {
    userProfile = { ...userProfile, ...req.body };
    res.json({ message: "Profile updated successfully", data: userProfile });
  };
 