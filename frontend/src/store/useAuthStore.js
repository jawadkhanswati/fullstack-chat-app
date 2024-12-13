
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:8888":"/"

export const useAuthStore=create((set,get)=>({
    authUser:null,
    
    isSigningUp:false,

    isLogging:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    onlineUsers:[],
    socket:null,
    
    //if user login or signup the user data store state
    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check")
             
            set({authUser:res.data});
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth: ",error)
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            toast.success("Account created successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({
                isSigningUp:false
            })
        }
    },

    //login the user
    login:async(data)=>{
        set({isLogging:true})
        try {
            const res= await axiosInstance.post("/auth/login",data);
             set({authUser:res.data});
             toast.success("Logged in successfully")
             get().connectSocket()
            
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isLogging:false})
        }
    },

    //logout the user
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success("Logged out successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    //updating only profile pic of login user 
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res})
            toast.success("profile updated successfully")
        } catch (error) {
            console.log("error in update profile",error)
            toast.error(error.response.data.message)
        } finally{
            set({isUpdatingProfile:false})
        }
    },

    //connecting socket from backend to frontend 
    connectSocket:()=>{
        const {authUser} =get();
        if(!authUser || get().socket?.connected) return;
        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id   
            }
        });
        socket.connect();
        set({ socket:socket });

        socket.on("getOnlineUsers",(usersIds)=>{
            set({onlineUsers:usersIds})
        })
    },
    //disconnecting socket from backend to frontend 
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect()
    }
}))