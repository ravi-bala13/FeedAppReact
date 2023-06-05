import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils/Constants";
import "../css/PostList.css";
import { Box } from "@mui/material";
import Cookies from "js-cookie";

function PostsList(props) {
  const [posts, setPosts] = useState([]);
  console.log("posts:", posts);

  // getting token from cookie and parse
  const token = Cookies.get("token");
  console.log("token:", token);
  if (token) {
    let decodeToken = JSON.parse(atob(token.split(".")[1]));
    var { _id: userId = null } = decodeToken.user;
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    try {
      axios
        .get(backendUrl + "posts/" + userId)
        .then((res) => setPosts(res.data));
    } catch (error) {
      console.log("Error in getAllUsers", error);
    }
  };

  const handleLikes = (postId, typeOfLike) => {
    try {
      const url = `${backendUrl}posts/${postId}/${typeOfLike}/${userId}`;
      console.log("Network calling to url", url);
      axios.post(url).then((res) => {
        console.log("Response", res);
        // alert("Post created successfully");
      });
    } catch (error) {
      console.log("Error in handleSubmit", error);
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
              {ele._username}
            </div>
            <div className="post-box">{ele._content}</div>
            <div className="count-box">
              <span>{ele._likes} likes</span>
            </div>
            <div className="bottom-box">
              <span
                onClick={() =>
                  handleLikes(ele._postId, ele._isUserLiked ? "unlike" : "like")
                }
              >
                {ele._isUserLiked ? "UnLike" : "Like"}
              </span>
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
