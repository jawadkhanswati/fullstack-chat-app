import { X } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import { useChatStore } from "../store/useChatStore"

const ChatHeader = () => {
    const {selectedUser,setSelectedUser} =useChatStore()
    const {onlineUsers}=useAuthStore()
  return (
    <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
                {/* Avatar */}
                <div className="avatar">
                    <div className="size-10 rounded-full relative">
                        <img src={selectedUser.profilePic || "./public/profile.jpg"} alt={selectedUser.fullName} />
                    </div>
                </div>
                {/* User Info */}
                <div>
                    <h3 className="font-medium px-2">{selectedUser.fullName}</h3>
                    <p className="text-sm px-2 text-base-content/50">
                    {onlineUsers.includes(selectedUser._id)?"online":"offline"}
                    </p>
                </div>
            </div>
            {/* close button */}
            <button onClick={()=>setSelectedUser(null)}>
                <X/>
            </button>
        </div>
      
    </div>
  )
}

export default ChatHeader
