import React from 'react';
import './Footer.css'
import heartIcon from '../../icons/heart.png'
import githubIcon from '../../icons/github.png'
import linkedIcon from '../../icons/linkedin.png'
const Footer = () => {
    return (
        <div className="footer">
           <p>Made with <img src={heartIcon} alt="heart"></img> by Suresh</p> 
           <div className="icons">
               <a href="https://github.com/suresh213/"><img src={githubIcon} alt="github"></img></a>
               <a href="https://www.linkedin.com/in/suresh-a/"><img src={linkedIcon} className="link-icon" alt="linkedin"></img></a>
           </div>
        </div>
    )
}
export default Footer;