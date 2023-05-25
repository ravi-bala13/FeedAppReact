import React from "react";
import PostsList from "./PostsList";
import Chat from "./Chat";
import "../css/Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="left_side_div"></div>

      <div className="mid_div">
        <PostsList />
      </div>

      <div className="right_side_div">
        <Chat />
      </div>
    </div>
  );
}
