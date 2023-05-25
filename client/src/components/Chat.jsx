import React, { useEffect, useState } from "react";
import "../css/Chat.css";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { loadData } from "../utils/localStorage";

export default function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log("messageList:", messageList);
  //   const [username, setUsername] = useState("bala");
  const [room, setRoom] = useState("bala");

  const username = loadData("username");
  console.log("username:", username);

  //   const socket = io.connect(`http://localhost:3001`);
  const socket = io("http://localhost:3001", {
    query: {
      userId: username,
    },
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      //   setShowChat(true);
    }
  };
  joinRoom();

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        recipient: "bals161616",
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data:", data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            console.log("messageContent:", messageContent);
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}fgdf</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          //   onKeyPress={(event) => {
          //     event.key === "Enter" && sendMessage();
          //   }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
