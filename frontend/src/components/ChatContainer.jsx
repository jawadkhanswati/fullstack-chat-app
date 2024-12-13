import { useEffect, useRef } from "react"
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"
import MessageSkeleton from "./skeletons/MessageSkeleton"
import { useAuthStore } from "../store/useAuthStore"
// import { formatMessageTime } from "../lib/utils"
import moment from "moment"

const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser,subscribeToMessages,unsubscribeFromMessages}=useChatStore()
  const {authUser} =useAuthStore()

  // scroll bar auto end 
  const messageEndRef=useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages();

    return ()=>unsubscribeFromMessages();
  }, [selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages])


  //useeffect for auto scroll when new message
  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages])


  if(isMessagesLoading) return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <MessageSkeleton/>
      {/* <MessageInput/> */}
    </div>
  )


  
  return (
    <div className="flex-1 flex flex-col w-full overflow-auto">
      <ChatHeader/>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {
          messages.map((messages)=>(
            <div key={messages._id} className={`chat   ${messages?.senderId===authUser._id?"chat-end":"chat-start"}`} ref={messageEndRef}>
              
              <div className="chat-image  avatar">
                <div className="size-10 rounded-full border">
                  <img src={messages.senderId===authUser._id ? authUser.profilePic || "./public/profile.jpg" : selectedUser.profilePic || "./public/profile.jpg"} alt="profile pic" />
                </div>
              </div>
           
              <div className={`chat-bubble ${messages.senderId===authUser._id?"bg-green-800":""} flex-col flex`}>
                {
                  messages?.image &&(
                    <img src={messages.image} alt="Attachment" className="sm:max-w-[200] rounded-md mb-2" />
                  )}
                  {messages?.text && <p>{messages.text}</p>}
                  <time className="text-sm text-end  opacity-40 ml-8 lg:ml-28 pt-[1px]">{moment(messages.createdAt).format("hh:mm A")} </time>
              </div>
            </div>
          ))
        }
      </div>

      <MessageInput/>
    </div>
  )
}

export default ChatContainer
