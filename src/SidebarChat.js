import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './SidebarChat.css';

function SidebarChat({ addNewChat }){
  const[seed,setSeed]=useState("");
  
  const createChat = () => {
      const roomName = prompt("Enter the name or email address of person to connect to");

      if(roomName){
          alert(roomName)
      }

  };

  useEffect(()=>{
    setSeed(Math.floor(Math.random()*5000));
  },[]);
       
  return !addNewChat ? ( 
    <div className="sidebarChat">
    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
    <div className="sidebarChat__info">
       <h2>Room name</h2>
       <p>Last message ...</p>
    </div>
  </div>) : 
  <div onClick={createChat}
className="centerChat">
  <h2>Add new Chat</h2>
</div> ;
    
  
}

export default SidebarChat