import React from 'react';
import './Sidebar.css';
import dotIcon from '../../icons/onlineIcon.png'
import msgIcon from '../../icons/email.png'
import groupIcon from '../../icons/group.png'
const Sidebar = ({users ,name}) => {
    
    return(
    
      <div className="side-bar-container">
        <div className="head">
        <img src={msgIcon} className="msg-icon" alt=""></img>
        <p >Chat app</p>
      </div>

      <div className="menu">
          <p>Users online</p>
      </div>

      <div className="menu-2">
          <img src={groupIcon} className="icon-grp" alt="group" alt=""></img>
          <img src={dotIcon} className="icon" alt=""></img>
          <p>{users.length}</p>
        </div>
      
      {
        (users)
          ? (
              <div className="scrollbar1 scrollbar1-primary1 ">
                <div className="users">
                  {users.map(({name}) => (
                    <div key={name} className="pt1-20">
                         {name}
                    </div>
                  ))}
                </div>
                </div>
          )
          : null
      }
    </div>
  );
    }

export default Sidebar;