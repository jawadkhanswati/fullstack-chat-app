import express from "express"
import authRoute from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import env from "dotenv"
import { connectdb } from "./lib/db.js";
import cors from "cors"
import cookieparser from "cookie-parser"
import { server,app } from "./lib/socket.js";
import path from "path"

env.config()

const port = process.env.PORT;
const __dirname=path.resolve()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieparser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use("/api/auth",authRoute);
app.use("/api/message",messageRoutes);

//for production code deploying
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"..frontend","dist","index.html"))
    })
}


server.listen(port,()=>{
    console.log("the server is running on port ", port)
    connectdb()
})