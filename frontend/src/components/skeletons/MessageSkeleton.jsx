
const MessageSkeleton = () => {
    const skeletonMessage=Array(5).fill(null)
  return (
 
      <div className=" flex-1 overflow-y-auto mt-3">
        {skeletonMessage.map((_,idx)=>(
            <div key={idx} className={`chat ${idx%2===0?"chat-start":"chat-end"}`}>
                <div className="chat-image avatar">
                    <div className="size-10 rounded-full">
                        <div className="skeleton h-full w-full rounded-full">
                        </div>
                    </div>

                    <div className="chat-bubble bg-transparent ">
                        <div className="skeleton h-16 w-[200px] "/>
                    </div>

                </div>
            </div>
        ))
    }
      </div>
   
  )
}

export default MessageSkeleton
