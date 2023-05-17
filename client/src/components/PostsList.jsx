import axios from "axios";
import React, { useEffect, useState } from "react";

function PostsList(props) {
  const [posts, setPosts] = useState([]);
  console.log("posts", posts);

  const backendUrl = "https://feedapp.onrender.com/";

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
    <div className="container-box long-box">
      {posts.map((ele) => (
        <div>
          <div className="post-box">ele.content</div>
          <div className="bottom-box">
            <span>Like</span>
            <span>Dislike</span>
            <span>Edit</span>
            <span>Delete</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
