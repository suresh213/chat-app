import React from 'react';
import './Message.css'

const Message = ({message : {user,text,image} , name}) =>{

    let isMessagesentbyCurrentUser = false;
    const base64Flag = "data:image.jpeg;base64,";
    const trimmedname = name.trim().toLowerCase();
    
    if(user === trimmedname){
        isMessagesentbyCurrentUser = true;
    }
    
    return (
    (isMessagesentbyCurrentUser)?
        <div className="message-cointainer justify-end">
            <p className="sentText pr-10">You</p>
                {
                    (image)?
                    <img src={base64Flag+image} className="imageBox" alt=""></img>
                    :
                    <div className="messageBox blue">   
                         <p className="msgtext white">{text}</p>
                    </div>
                }
        </div>
    :
        <div className="message-cointainer justify-start">
                {
                    (image)?
                    <div >
                        <img src={base64Flag+image} className="imageBox" alt=""></img>
                    </div>
                    :
                    <div className="messageBox grey"> 
                        <p className="msgtext black ">{text}</p>
                    </div>
                }
            
            <p  className="sentText pl-10">{user}</p>
        </div>
    );
}

export default Message;