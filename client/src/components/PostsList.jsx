import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils/Constants";
import "../css/PostList.css";
import { Box } from "@mui/material";

function PostsList(props) {
  const [posts, setPosts] = useState([]);

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

  return (
    <div>
      <div className="postlist_container_box long-box">
        {posts.map((ele, i) => (
          <Box
            className="post-container"
            boxShadow={3}
            borderRadius={8}
            p={3}
            key={i}
          >
            {/* <div className="post-container" key={i}> */}
            <div className="post-title">
              <img
                src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                alt=""
              />
              {ele.user_id.user_name}
            </div>
            <div className="post-box">{ele.content}</div>
            <div className="count-box">
              <span>33 likes</span>
            </div>
            <div className="bottom-box">
              <span>Like</span>
              <span>Comment</span>
              <span>Share</span>
            </div>
            {/* </div> */}
          </Box>
        ))}
      </div>
    </div>
  );
}

export default PostsList;
