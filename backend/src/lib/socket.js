import {Server} from "socket.io"
import http from "http"
import express from "express"

const app=express();
const server= http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"],
        method:["GET","POST"]
    }
});

export function getRecieverSocketId(userId){
    return userSocketMap[userId]
}

//used to store the online users 
const userSocketMap={}

io.on("connection",(socket)=>{
    // console.log("a user connected ",socket.id)
    const userId=socket.handshake.query.userId
    if(userId) userSocketMap[userId]=socket.id;
    //io.Emit()  is used to send events to all the connected client;
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        // console.log("user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export {app,io,server}