import { Avatar, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import React, { useEffect, useState } from "react";
import "./css/Chat.css";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import { useParams } from "react-router-dom";
import db from "./FirebaseConfig";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";
import Moment from "react-moment";

function Chat() {
  const [{ user }] = useStateValue();
  const [message, setMessage] = useState("");
  var id = useParams();
  const [chatName, setChatName] = useState("");
  const [messages, setMessages] = useState([]);
  // const q = query(
  //   collection(db, "chats", id.id, "messages"),
  //   orderBy("timestamp", "asc")
  // );

  useEffect(() => {
    onSnapshot(doc(db, "chats", id.id), (doc) => {
      setChatName(doc.data().name);
    });

    onSnapshot(
      query(
        collection(db, "chats", id.id, "messages"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      }
    );
  }, [id]);
  // console.log(messages[messages?.length - 1]?.msg);

  useEffect(() => {
    console.log(messages[messages?.length - 1]?.msg);

if((messages[messages?.length - 1]?.msg) != undefined){

   addDoc(collection(db, "lastmsg"), {
      lastmsg: messages[messages?.length - 1]?.msg,
      timestamp: serverTimestamp(),
    })

}

   
  
  }, [messages]);

  const sent = (e) => {
    e.preventDefault();
    addDoc(collection(db, "chats", id.id, "messages"), {
      msg: message,
      timestamp: serverTimestamp(),
      name: user.displayName,
      sender: user.uid,
    }).then(() => {
      setMessage("");
    });
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerInfo">
          <Avatar />
          <div className="chat__headerText">
            <h2>{chatName}</h2>
            <p>
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate().toUTCString()
              ).toLocaleString()}
            </p>
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

      <div className="chat__body">
        {messages.map((message) => (
          <div className="chat__message__container">
            <div
              className={`chat__message ${
                message.sender === user.uid ? "sent" : "recieved"
              }`}
            >
              <div className="chat__messageName">{message.name}</div>
              {message.msg}

              <div className="chat__messageTime">
                {<Moment fromNow>{message.timestamp?.toDate()}</Moment>}
              </div>
            </div>
          </div>
        ))}
      </div>
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
          <form className="chat__msgbox">
            <input
              type="text"
              value={message}
              className="chat__msg"
              placeholder="Type a message"
              onChange={(e) => {
                setMessage(e.target.value.replace(/\s+/g, " "));
              }}
            />
            <button
              className="sendMessageButton"
              type="submit"
              disabled={!message}
              onClick={sent}
            ></button>
          </form>
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
