import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

//signup
export const signup=async(req,res)=>{
    const {email,fullName,password}=req.body;
    try {
        if(!email||!fullName||!password){
           return res.status(400).json({message:"All fields are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 character"})
        }

        const user=await User.findOne({email})
        if(user){
          return res.status(400).json({message:"Email already exists"}) 
        }

        const salt=await bcrypt.genSalt(10);
        const hashpassword =await bcrypt.hash(password,salt);
        
        const newUser=new User({
            fullName,
            email,
            password:hashpassword
        })
        if(newUser){
            //generate jwt token function call
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
        
    } catch (error) {
        // console.log("Error in signup controller", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

//login function
export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password ){
            return res.status(400).json({message:"all fields are required"})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"invalid credential"})
        }
        
        const ispasswordcorrect =await bcrypt.compare(password,user.password)
        if(!ispasswordcorrect){
            return res.status(400).json({message:"invalid credential"})
        }
        generateToken(user._id,res)
        return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        // console.log("Error in Login controller",error.message)
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}

//logout
export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        // console.log("Error in Logout controller",error.message)
        return res.status(200).json({message:"Logout Successfully"})
    }
}

//update profile
export const updateprofile=async(req,res)=>{
    try {
        const {profilepic} =req.body;
        const userId=req.user._id;
        
        if(!profilepic){
            return res.status(400).json({message:"profile pic is required"})
        }
        const uploadResponse=await cloudinary.uploader.upload(profilepic)
        const updateduser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
        res.status(200).json({updateduser})
    } catch (error) {
        // console.log("error in update profile",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth=async(req,res)=>{
    try {
        res.status(200).json(req.user);
        
    } catch (error) {
        // console.log("Error in check route",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}