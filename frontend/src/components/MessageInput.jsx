import { useRef } from "react"
import { useState } from "react"
import { useChatStore } from "../store/useChatStore"
import { Image, Send, X } from "lucide-react"
import toast from "react-hot-toast"

const MessageInput = () => {
    const [text,setText]=useState("")
    const [imagePreview,setImagePreview]=useState(null)
    const fileinputRef=useRef(null)
    const {sendMessage}=useChatStore()

   

    const handleImageChange=(e)=>{
     const file=e.target.files[0];
     if(!file.type.startsWith("image/")){
      toast.error("please select the image file")
      return ;
     }
     const reader=new FileReader()
     reader.onloadend=()=>{
       const read=reader.result;
       setImagePreview(read)
      };
      reader.readAsDataURL(file);
    }

    const removeImage=()=>{
      setImagePreview(null);
      if(fileinputRef.current) fileinputRef.current.value="";
    };

    const handlesendMessage=async(e)=>{
      e.preventDefault();
      if(!text.trim() && !imagePreview) return;
      try {
        await sendMessage({
          text:text.trim(),
          image:imagePreview
        })
        // Clear from
        setText("")
        setImagePreview(null)
        if(fileinputRef.current) fileinputRef.current.value="";
      } catch (error) {
        console.log("Failed to send message",error)
      }
    }
  return (
    // if selected image then show from the messageSendInput up part
    <div className="p-4 w-4">
      <img src="./public/pro" alt="" />
      {imagePreview&&(
        <div className="mb-3 flex items-center gap-2">
          
            <div className="relative">
            <img src={imagePreview} alt="preview" className="ml-32 w-32 h-20 object-cover rounded-lg border border-red-700" />
            <button className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-300 text-black flex items-center justify-center" type="button" onClick={removeImage}>
                <X className="size-3"/>
            </button>
            </div>
        </div>
      )}

{/* MessageSendInput */}

<form onSubmit={handlesendMessage} className="flex items-center gap-2">
<div className="flex-1 flex gap-2">

     <input type="text" className=" w-[50vw]  lg:w-[60vw] input input-bordered border-lg input-sm sm:input-md" placeholder="type a message" value={text} onChange={(e)=>setText(e.target.value)}/>
 
     <input type="file" accept="image/*" ref={fileinputRef} className="hidden" placeholder="type a message" onChange={handleImageChange}/>

     <button className={`hidden sm:flex btn btn-circle ${imagePreview? "text-emerald-500" : "text-zinc-400"}`} onClick={()=>fileinputRef.current?.click()}>
      <Image size={20}/>
     </button>
     <button type="submit" className="btn sm:mt-2 btn-sm btn-circle" disabled={!text.trim()&& !imagePreview}><Send size={33} className="text-green-700
     -700"/></button>
</div>
</form>
    </div>

  )
}

export default MessageInput
