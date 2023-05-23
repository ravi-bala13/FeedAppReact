import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PostsList(props) {
  const [posts, setPosts] = useState([]);
  console.log("posts", posts);

  const userId = useSelector((state) => state.userId);
  console.log("userId:", userId);

  const backendUrl = "https://feedappreact.onrender.com/";
  // const backendUrl = "http://localhost:8080/";

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
      {userId ? (
        <div className="container-box long-box">
          {posts.map((ele, i) => (
            <div key={i}>
              <div>{ele.user_id.user_name}</div>
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
