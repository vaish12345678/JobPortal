import { User } from "../models/user model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

import { getDataUri } from "../utils/dataUri.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email }); //user find out by email
    if (user) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return res.status(201).json({
      message: "Account create successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    //CHECK ROLE IS CORRECT OR NOT
    if (role != user.role) {
      return res.status(400).json({
        message: "Check your role properly",
        success: false,
      });
    }

    const tokenData = {
      // userId:user._id
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    }); //creating a token
    // user={
    //     _id:user._id,
    //     fullname:user.fullname,
    //     phoneNumber:user.phoneNumber,
    //     role:user.role,
    //     profile:user.profile
    // }

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullname}`,
        //user
        userData,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

//Return the currently logged-in user’s details (excluding the password).
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password"); // don't return password
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//logout

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", " ", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "logout successfully",

        success: true,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Logout failed", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;

    //cloudinary ayega....
    const fileUri = getDataUri(file); //function call
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    // uploading a file to Cloudinary

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    //update profile must authenticated
    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    //updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.bio = bio;
    if (skills) user.skills = skillsArray;

    //resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //saves the original file namee
      //file.originalname is the original name of the file that was uploaded (e.g., "John_Doe_Resume.pdf").
    }

    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated successfully ",
      user, //returns user
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "server error while updating profile",
      success: false,
    });
  }
};
