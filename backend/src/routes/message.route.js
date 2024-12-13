import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

//getting all users  for sidebar
router.get("/users",protectRoute,getUsersForSidebar)

//geting the messages of sender and receiver
router.get("/:id",protectRoute,getMessages)

//route to send messages
router.post("/send/:id",protectRoute,sendMessage)

export default router;