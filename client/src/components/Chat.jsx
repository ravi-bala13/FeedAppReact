import React, { useEffect, useState } from "react";
import "../css/Chat.css";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { backendUrl, websoketUrl } from "../utils/Constants";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Chat({ recipient, setRecipient }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const { userName } = useSelector((state) => state);

  const socket = io(websoketUrl, {
    query: {
      userId: userName,
    },
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: userName,
        recipient: recipient,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      saveMessageToDb(messageData);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const saveMessageToDb = (body) => {
    try {
      let commId = [body.recipient, body.author].sort().join("_"); //bala_hema
      console.log("commId:", commId);
      axios
        .post(backendUrl + "chats/" + commId, body)
        .then((res) => {
          console.log("Response", res);
        })
        .catch((err) => {
          console.log("Error in network call", err.message);
        });
    } catch (error) {
      console.log("Error in saveMessageToDb", error);
    }
  };

  const getChatMessageForUser = (body) => {
    try {
      let commId = [body.recipient, body.author].sort().join("_"); //bala_hema
      axios
        .get(backendUrl + "chats/" + commId)
        .then((res) => res)
        .catch((err) => {
          console.log("Error in network call", err.message);
        });
    } catch (error) {
      console.log("Error in getAllUsers", error);
    }
  };

  return (
    <div className="chat-window">
      {recipient ? (
        <>
          <div className="chat-header">
            <p>{recipient}</p>
            <p>
              <IoMdCloseCircleOutline
                onClick={() => setRecipient("")}
                className="minimize-icon"
              />
            </p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">
              {messageList.map((messageContent, i) => {
                return (
                  <div
                    key={i}
                    className="message"
                    id={userName === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
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
              placeholder={"Chat with " + recipient}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </>
      ) : null}
    </div>
  );
}
