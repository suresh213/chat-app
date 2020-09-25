import React,{useState} from 'react';
import axios from 'axios';
import './Inputbar.css'
import sendIcon from '../../icons/send.png'
import attachmentIcon from '../../icons/attachment.png'
const Inputbar = ({setMessage, sendMessage, message, sendImg}) =>{

    const [file, setFile] = useState('');
   
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }
   
    const handleChange = (e) => {
        setMessage(e.target.files[0])
        const file = e.target.files[0];
        setFile(file);
        getbase64(file);
    }
    
    const getbase64 =  async(file) => {
        const formdata = new FormData();
        formdata.append("file", file);
        try{
            const res = await axios.post('https://localhost:5000/upload', formdata, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });

            const buffer = res.data;
            const imagestr = arrayBufferToBase64(buffer.data.data);
            setMessage(imagestr)
            sendImg(imagestr)
        }
        catch(err){
            console.log('error' +err);
        }
    }

    return (
        <div className="form"> 
            <input  className="input-bar" 
                    type='text'
                    placeholder="Type a message..."
                    value={message}
                    onChange = {(event) => setMessage(event.target.value)} 
                    onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null}
             />
             <div className="image-upload">
                <label htmlFor="file-input">
                    <img src={attachmentIcon} alt="attach"/>
                </label>
                
                <input id="file-input" type="file" name="image" onChange={handleChange} />
            </div>
            <button className="send-btn" ><img src={sendIcon} onClick={event => sendMessage(event)} alt="send" className="send-icon"></img></button>
        </div>        
    )
}

export default Inputbar;
