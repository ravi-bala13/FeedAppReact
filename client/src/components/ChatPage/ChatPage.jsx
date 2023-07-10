import React, { useState } from "react";
import ChatUsers from "./ChatUsers";
import Chat from "./Chat";

export default function ChatPage() {
  const [recipient, setRecipient] = useState("");
  return (
    <div>
      <div className="left_side_div">
        <ChatUsers setRecipient={setRecipient} />
      </div>

      <div className="right_side_div">
        <Chat recipient={recipient} setRecipient={setRecipient} />
      </div>
    </div>
  );
}
