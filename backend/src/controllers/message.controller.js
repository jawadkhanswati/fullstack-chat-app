import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteruser=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteruser)
    } catch (error) {
        // console.log("Error In getUserForSidebar ",error.message)
        res.status(200).json({error:"Internal Server Error"})
    }
}

//get all messages for single user
export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}

            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        // console.log("error in getMessages controller",error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

//messasges sending function
export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

          let imageUrl;
        if(image){
            //upload the image to cloudinary
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save();

        //real time sending message to single user  socket functionality
       const recieverSocketId= getRecieverSocketId(receiverId);
       if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage",newMessage)
       }

        res.status(201).json(newMessage)
    } catch (error) {
        // console.log("error in sendMessage controller",error .message)
        res.status(500).json({error:"Internal server error"})
    }
}