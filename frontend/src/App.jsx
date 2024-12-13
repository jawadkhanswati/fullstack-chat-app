import Navbar from "./components/Navbar"
import {Routes,Route, Navigate} from "react-router-dom"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { useThemeStore } from "./store/UseThemeStore"


function App() {

  const {theme}=useThemeStore()

  const {authUser,checkAuth,onlineUsers,isCheckingAuth}=useAuthStore()
  // console.log("this is online users",onlineUsers)
  useEffect(()=>{
    checkAuth()
  },[checkAuth,onlineUsers])

  if(!authUser && isCheckingAuth)return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )

  return (
    
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<HomePage/>:<Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path="/setting" element={<SettingPage/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
      </Routes>

      <Toaster></Toaster>
    </div>
  )
}

export default App