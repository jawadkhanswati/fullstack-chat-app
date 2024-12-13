import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore"
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Siderbar = () => {
    const {getUsers,users,selectedUser,setSelectedUser,isUsersLoading}=useChatStore()

    const {onlineUsers}=useAuthStore();
    const [showOnlineOnly,setshowOnlineOnly]=useState(false)

    useEffect(()=>{
        getUsers()
    },[getUsers]);

    //filtered the online user in sidebar
    const filteredUsers=showOnlineOnly?users.filter(user=>onlineUsers.includes(user._id)):users

    if(isUsersLoading) return <SidebarSkeleton/>
  return (
    <aside className="h-full w-[4.1rem] lg:w-64 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-2">
            <div className="flex items-center  justify-center gap-2">
                <Users className="size-6"/>
            </div>

            {/*  Online filter toggle */}
            <div className="mt-3 hidden lg:flex items-center gap-2">
                <label htmlFor="" className="cursor-pointer flex items-center gap-2">
                    <input type="checkbox" checked={showOnlineOnly} onChange={(e)=>setshowOnlineOnly(e.target.checked)} className="checkbox checkbox-sm"/>
                    <span className="text-sm">Show Online</span>
                </label>
                <span className="text-xs text-zinc-500">({onlineUsers.length - 1}online)</span>
            </div>

            <div className="overflow-y-auto w-12 lg:w-full py-4">
                {
                    filteredUsers.map((user)=>(
                        <button key={user._id} onClick={()=>setSelectedUser(user)} className={`w-full  my-4 py-1 lg:px-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id===user._id?"bg-base-300 ring-1 ring-base-300":""}`}>
                            <div className="relative mx-auto lg:mx-0">
                                <img src={user.profilePic || "/profile.jpg"} alt={user.name} className="h-10 w-10 lg:size-12 object-cover rounded-full" />
                                {
                                    onlineUsers.includes(user._id) &&(
                                        <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                                    )}
                            </div>

                            {/* User info - only visible on larger screen */}
                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate">{user.fullName}</div>
                                <div className="text-sm text-zinc-400">
                                    {onlineUsers.includes(user._id)?"online":"offline"}
                                </div>
                            </div>
                        </button>
                    ))
                }
            </div>
            {
                filteredUsers.length===0&&(
                    <div className="text-center text-zinc-500 py-4">No online users</div>
                )
            }
        </div>
    </aside>
  )
}

export default Siderbar
