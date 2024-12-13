import express from "express"
import { checkAuth, login, logout, signup, updateprofile } from "../controllers/auth.contoller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router=express.Router()

//signup
router.post("/signup",signup)
//login
router.post("/login",login)
//logout
router.post("/logout",logout)
// updateprofile
router.put("/update-profile",protectRoute,updateprofile)
//
router.get("/check",protectRoute,checkAuth)

export default router