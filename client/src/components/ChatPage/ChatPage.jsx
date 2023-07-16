import React, { useState } from "react";
import ChatUsers from "./ChatUsers";
import Chat from "./Chat";
import "../../css/ChatPage.css";

export default function ChatPage() {
  const [recipient, setRecipient] = useState("");
  return (
    <div className="chat_page">
      <div
        className={
          // eslint-disable-next-line
          "left_side_div " + `${recipient ? "" : "make_visible_chat_user"}`
        }
      >
        <ChatUsers setRecipient={setRecipient} />
      </div>

      {recipient ? (
        <div className="mid_div make_center make_visible_chat">
          <Chat recipient={recipient} setRecipient={setRecipient} />
        </div>
      ) : null}
    </div>
  );
}
