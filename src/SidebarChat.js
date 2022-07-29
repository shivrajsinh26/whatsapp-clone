import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./css/SidebarChat.css";
import db from "./FirebaseConfig";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
// import { doc, setDoc } from "firebase/firestore";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [last, setLast] = useState([]);

  const createChat = () => {
    var chatName = prompt(
      "Enter the name or email address of person to connect to"
    );
    if (chatName) {
      addDoc(collection(db, "chats"), {
        name: chatName,
        addDate: serverTimestamp()
      });

    }
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    onSnapshot(
      query(
        collection(db, "lastmsg"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        setLast(snapshot.docs.map((doc) => doc.data()));
      }
    );

  }, []);

  return !addNewChat ? (
    <Link to={`/chats/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{((last[last?.length - 1])?.lastmsg)}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="centerChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
