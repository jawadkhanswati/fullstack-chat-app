import { useState } from "react"
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })
  const {login,isLogging} =useAuthStore();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    login(formData)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
       {/* left side of the form */}
       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8" >
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MessageSquare className="size-6 text-primary"/>
              </div>
              <h1 className="text-2xl font-bold mt-2">create Account</h1>
              <p className="text-base-content/60">Get Started With Free Account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
          

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-event-none">
                  <Mail className="size-5 text-base-content/40"/>
                </div>
                <input type="text" className={`input input-bordered w-full pl-10`} placeholder="email" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="size-5 text-base-content/40"/>
                </div>
                <input type={showPassword?"text":"password"} className={`pl-10 w-full input-bordered input`} placeholder="password" onChange={(e)=>setFormData({...formData,password:e.target.value})} />
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3">{showPassword?(<EyeOff className="size-5 text-base-content/40"/>):<Eye className="size-5 text-base-include/40"/>}</button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLogging}>{isLogging?(<>
            <Loader2 className="size-5 animate-spin"/>
            Loading...
            </>):("Create Account")}</button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">Already have an account?{" "}</p>
            <Link to="/signup" className="link link-primary">Sign in</Link>
          </div>
        </div>
       </div>

       {/* right side */}
       <AuthImagePattern title="join out community"
       subtitle="Connect with friends, share moments, and stay in touch with your love"/>
    </div>
  )
}

export default LoginPage
