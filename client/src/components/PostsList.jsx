import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../utils/Constants";
import "../css/PostList.css";
import { Avatar, Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useSelector } from "react-redux";

import InfiniteScroll from "react-infinite-scroll-component";

function PostsList() {
  const [postList, setPostList] = useState([
    // {
    //   _postId: null,
    //   _username: null,
    //   _content: null,
    //   _likes: 0,
    //   _isUserLiked: false,
    // },
  ]);
  console.log("postList:", postList);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { userId } = useSelector((state) => state);

  const getAllPosts = () => {
    const url = `${backendUrl}posts/${userId}`;
    console.log("Network call to:", url);
    try {
      axios
        .get(url, {
          params: {
            page: page,
            size: 7,
          },
        })
        .then((res) => {
          let list = res.data;
          if (list.length === 0) {
            setHasMore(false);
          }
          setPostList((prev) => [...prev, ...list]);
          setPage((prevPage) => prevPage + 1);

          console.log("Response for getting all post", list);
        });
    } catch (error) {
      console.log("Error in getAllUsers", error);
    }
  };

  useEffect(() => {
    getAllPosts();
    //  to ignore the warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      console.log("Network call to:", url);
      const body = {
        postId,
        userId,
      };
      console.log("Network calling to url", url);
      axios.post(url, body).then((res) => {
        console.log("Response for like the post", res);
      });
    } catch (error) {
      console.log("Error in handleLikes", error);
    }
  };

  return (
    <div>
      <div className="postlist_container_box long-box">
        <InfiniteScroll
          dataLength={postList.length}
          next={getAllPosts}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
        >
          {postList.map((post, i) => (
            <Box
              className="post-container"
              boxShadow={3}
              borderRadius={5}
              p={3}
              key={i}
              width={"95%"}
            >
              <div className="post-title">
                <Avatar className="avatar" sx={{ bgcolor: deepPurple[500] }}>
                  {post._username ? post._username[0].toUpperCase() : null}
                </Avatar>
                {post._username}
              </div>
              <div className="post-content-box">{post._content}</div>
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
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default React.memo(PostsList);
