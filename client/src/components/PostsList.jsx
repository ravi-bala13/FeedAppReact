import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils/Constants";
import "../css/PostList.css";
import { Box } from "@mui/material";
import Cookies from "js-cookie";

function PostsList(props) {
  const [postList, setPostList] = useState([
    {
      _postId: null,
      _username: null,
      _content: null,
      _likes: 0,
      _isUserLiked: false,
    },
  ]);

  // getting token from cookie and parse
  const token = Cookies.get("token");
  console.log("token:", token);
  if (token) {
    let decodeToken = JSON.parse(atob(token.split(".")[1]));
    var { _id: userId = null } = decodeToken.user;
  }

  useEffect(() => {
    const getAllPosts = () => {
      try {
        axios
          .get(backendUrl + "posts/" + userId)
          .then((res) => setPostList(res.data));
      } catch (error) {
        console.log("Error in getAllUsers", error);
      }
    };
    getAllPosts();
  }, [userId]);

  const handleLikes = (postId, typeOfLike) => {
    // Doing this for front end change without waiting for backend updation
    let tempPosts = [...postList];
    tempPosts.map((post) => {
      if (post._postId === postId) {
        post._likes = typeOfLike === "like" ? post._likes + 1 : post._likes - 1;
        post._isUserLiked = !post._isUserLiked;
      }
      return post;
    });
    setPostList(tempPosts);
    // ************************************************88

    try {
      const url = `${backendUrl}posts/${typeOfLike}`;
      const body = {
        postId,
        userId,
      };
      console.log("Network calling to url", url);
      axios.post(url, body).then((res) => {
        console.log("Response", res);
      });
    } catch (error) {
      console.log("Error in handleLikes", error);
    }
  };

  return (
    <div>
      <div className="postlist_container_box long-box">
        {postList.map((post, i) => (
          <Box
            className="post-container"
            boxShadow={3}
            borderRadius={8}
            p={3}
            key={i}
          >
            <div className="post-title">
              <img
                src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                alt=""
              />
              {post._username}
            </div>
            <div className="post-box">{post._content}</div>
            <div className="count-box">
              <span>
                {post._isUserLiked
                  ? `You and ${post._likes - 1} more likes`
                  : `${post._likes} likes`}
              </span>
            </div>
            <div className="bottom-box">
              <span
                className={post._isUserLiked ? "unlike" : "like"}
                onClick={() =>
                  handleLikes(
                    post._postId,
                    post._isUserLiked ? "unlike" : "like"
                  )
                }
              >
                {post._isUserLiked ? "UnLike" : "Like"}
              </span>
              <span>Comment</span>
              <span>Share</span>
            </div>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default PostsList;
