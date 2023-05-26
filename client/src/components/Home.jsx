import React, { useState } from "react";
import PostsList from "./PostsList";
import Chat from "./Chat";
import "../css/Home.css";
import ChatUsers from "./ChatUsers";

export default function Home() {
  const [recipient, setRecipient] = useState("");
  return (
    <div className="home">
      <div className="left_side_div">
        <ChatUsers setRecipient={setRecipient} />
      </div>

      <div className="mid_div">
        <PostsList />
      </div>

      <div className="right_side_div">
        <Chat recipient={recipient} />
      </div>
    </div>
  );
}
