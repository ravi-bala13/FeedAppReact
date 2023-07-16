import React, { useState } from "react";
import PostsList from "./PostsList";
import Chat from "./ChatPage/Chat";
import "../css/Home.css";
import ChatUsers from "./ChatPage/ChatUsers";
import { useSelector } from "react-redux";

export default function Home() {
  const [recipient, setRecipient] = useState("");
  const { isLoading } = useSelector((state) => state);

  if (isLoading) {
    return (
      <div className="loading-gif">
        <img
          src="https://media.tenor.com/hlKEXPvlX48AAAAi/loading-loader.gif"
          alt=""
        />
      </div>
    );
  }

  return (
    <div className="home">
      <div className="left_side_div">
        <ChatUsers setRecipient={setRecipient} />
      </div>

      <div className="mid_div">
        <PostsList />
      </div>

      <div className="right_side_div">
        <Chat recipient={recipient} setRecipient={setRecipient} />
      </div>
    </div>
  );
}
