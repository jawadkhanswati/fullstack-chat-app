import { THEMES } from "../constants"
import { useThemeStore } from "../store/UseThemeStore"
import { Send } from "lucide-react"

const SettingPage = () => {
  const PREVIEW_MESSAGES=[
    {id:2,content:"Hey! How's it going",isSent:false},
    {id:1,content:"I'am going great! just working on some new features.",isSent:true},
  ]
  const {theme,setTheme}=useThemeStore()
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
     <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Theme</h2>
        <p className="text-sm text-base-content/70">Choose a theme for you chat interface</p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {
          THEMES.map((t)=>(
            <button key={t} className={`group flex gap-1.5 p-2 rounded-lg transition-colors ${theme===t?"bg-base-200":"hover:bg-base-200/50"}`} onClick={()=>setTheme(t)}>
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
                <span className="text-[11px] font-medium truncate w-full text-center">{t.charAt(0).toUpperCase()+t.slice(1)}</span>
            </button>
          ))
        }
      </div>

      {/* chat messagess */}

      <div className="p-4 space-y-4 min-h-[200px] overflow-y-auto bg-base-100">
        {
          PREVIEW_MESSAGES.map((messages)=>(
            <div key={messages.id} className={`flex ${messages.isSent?"justify-end":"justify-start"}`}>
              <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${messages.isSent?"bg-primary":"bg-base-200"}`}>
                <p className="text-sm">{messages.content}</p>

                <p className={`text-[10px] mt-1.5 ${messages.isSent?"text-primary":"text-base-content/70"}`}>12:00pm</p>

              </div>
            </div>
          ))}

          {/* chat input */}
          <div className="p-4 border-t border-base-300 bg-base-100">
            <div className="flex gap-2">
              <input type="text" className="input input-bordered flex-1 text-sm h-10" placeholder="type a message..." value={"this is preview"} readOnly />
              <button className="btn btn-primary h-10 min-h-0"><Send size={18}/></button>
            </div>
          </div>
      </div>
     </div>
    </div>
  )
}

export default SettingPage
