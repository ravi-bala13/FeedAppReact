import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./PostList.css";
import { backendUrl } from "../Constants/Constants";

function PostsList(props) {
  const [posts, setPosts] = useState([]);
  console.log("posts", posts);

  const { userId, isLoading } = useSelector((state) => state);
  console.log("isLoading:", isLoading);
  console.log("userId:", userId);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    try {
      axios.get(backendUrl + "posts").then((res) => setPosts(res.data));
    } catch (error) {
      console.log("Error in getAllUsers", error);
    }
  };

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
    <div>
      {userId ? (
        <div className="container-box long-box">
          {posts.map((ele, i) => (
            <div className="post-container" key={i}>
              <div className="post-title">
                <img
                  src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                  alt=""
                />
                {ele.user_id.user_name}
              </div>
              <div className="post-box">{ele.content}</div>
              <div className="bottom-box">
                <span>Like</span>
                <span>Dislike</span>
                <span>Edit</span>
                <span>Delete</span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default PostsList;
