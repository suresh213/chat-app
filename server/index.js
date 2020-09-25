const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app)
const io = socketio(server)
const router = require('./router');
const cors = require('cors')
const path = require('path')

app.use(cors());
app.use(router);

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users')

io.on('connection',(socket) => {

    socket.on('join', ({name, room} ,callback) => {
        const {error, user} = addUser( {id : socket.id , name , room })

        if(error){
            return callback(error);
        }
        
        socket.emit('message', {user: 'admin' , text : `Hey ${user.name}, welcome to room ${user.room}`, img:null});
        socket.broadcast.to(user.room).emit('message',  {user : 'admin', text : `${user.name}, has joined`,img:null});
        console.log('user connected')
        socket.join(user.room);
        io.to(user.room).emit('roomData',{user:user.room, users:getUsersInRoom(user.room)})
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message' , {user : user.name , text : message, image:null});
        
        callback();
    });
    socket.on('sendImage', (img, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message' , {user : user.name ,text: null, image : img });
        
        callback();
    });

    socket.on('disconnect', () =>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} had left.`})
            io.to(user.room).emit('roomData' , {user:user.room, users:getUsersInRoom(user.room)});
        }
    })
});

server.listen(process.env.PORT || 5000,() => {
    console.log(`Server is running in port 5000`);
})