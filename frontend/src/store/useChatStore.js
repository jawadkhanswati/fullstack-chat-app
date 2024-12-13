import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import{useAuthStore} from "./useAuthStore"

export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
            const res=await axiosInstance.get("/message/users")
            set({users:res.data});

        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isUsersLoading:false})
        }
    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessage:async(messagedata)=>{
        const {selectedUser,messages}=get();
        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messagedata);
           
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser) return;

        const socket=useAuthStore.getState().socket;

        socket.on("newMessage",(newMessage)=>{
            //send message to selected user only cannot show the message to other user in ui
            const isMessageSendFromSelectedUser = newMessage.senderId===selectedUser._id
            if(!isMessageSendFromSelectedUser) return;
            set({messages:[...get().messages,newMessage]})
        })
    },

    //
    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser:(selectedUser)=> set({selectedUser})
}))