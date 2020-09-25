import React from 'react';
import './Infobar.css'
import closeIcon from '../../icons/close.png'
const Infobar = ({room, name}) =>{

    return (
        <div className="infobar">
            <div className="left-container">
                <div>
                    <p>User : {name}</p>
                </div>
                <p className="pl">Room name : {room}</p>
            </div>
            
            <div className="right-container">
                
                <div>
                    <a href="/"><img src={closeIcon} alt="close"></img></a>
                </div>
            </div>
        </div>
    )
}

export default Infobar;