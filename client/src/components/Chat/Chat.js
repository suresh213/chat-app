import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Infobar from '../Infobar/Infobar'
import Inputbar from '../Inputbar/Inputbar';
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

import './Chat.css'
import Messages from '../Messages/Messages';
let socket;

const Chat = ( props ) => {
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const [users,setUsers] = useState('')
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT='https://localhost:5000'
 useEffect(() =>{
    const {name, room} = queryString.parse(props.location.search);
    socket = io(ENDPOINT)
    setName(name);
    setRoom(room);

    socket.emit('join', {name,room}, (error) =>{
       if(error){
         alert(error);
         props.history.push("/")
       }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
 },[ENDPOINT,props.location.search]);
    
 useEffect(() => {
    
    socket.on('message', (message) =>{
      setMessages(messages=>[ ...messages, message]);
    })

    socket.on('roomData', ({users}) => {
      setUsers(users)
    })
 },[]);
 
 const sendMessage = (event) => {
   event.preventDefault();
  if(message){
     socket.emit('sendMessage', message , () => setMessage(''));
   }
  }
  const sendImg = (event) => {
     setMessage(event)

   if(event){
      socket.emit('sendImage', event , () => setMessage(''));
      }
  }
  
    return(
       <div className="outer-container">
          <Sidebar users={users} name={name}/>
          <div className="inner-container">
             <Infobar room={room} name={name}/>
             <Messages messages={messages} name={name} />
             <Inputbar message={message}  setMessage={setMessage} sendImg={sendImg} sendMessage={sendMessage} />
             <Footer/>
          </div>
          
       </div>
   );
}

export default Chat;