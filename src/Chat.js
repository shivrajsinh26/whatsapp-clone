import { Avatar, IconButton } from "@mui/material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import React from "react";
import "./Chat.css";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";

function Chat() {
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerInfo">
          <Avatar />
          <div className="chat__headerText">
            <h2>Room Name</h2>
            <p>last seen today at 1:36 am</p>
          </div>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body"></div>
      <div className="chat__footer">
        <div className="chat__footerContent">
          <div className="chat__footerContentLeft">
            <IconButton>
              <InsertEmoticon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
          </div>

          <input
            type="text"
            className="chat__msgbox"
            placeholder="Type a message"
          />

          <div className="chat__footerContentRight">
          <IconButton>
            <MicIcon />
          </IconButton>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default Chat;
