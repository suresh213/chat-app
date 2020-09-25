import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import msgIcon from '../../icons/email.png'
import Footer from '../Footer/Footer'
import './Join.css'
const Join = () => {
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
   return(
       <div className="outerContainer">
           <div className="innerContainer">
                <div className="head1">
                    <img src={msgIcon} className="msg-icon1" alt=""></img>
                    <p >Chat app</p>
                </div>
                
               <div className="namediv"><p className="name">Name</p><input type="text" className="namefield" placeholder="Enter Username" onChange={(event) => setName(event.target.value)}/></div>
               <div className="namediv"><p className="name">Room</p><input type="text" className="roomfield" placeholder="Enter room" onChange={(event) => setRoom(event.target.value)} /></div>
               <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                <button className="join-btn" type="submit">Join</button>
               </Link>
               <div id="footer1"></div>
               <Footer/>
           </div>
        </div>
   );
}

export default Join;