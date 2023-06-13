import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { backendUrl } from "../utils/Constants";

export default function CommentBox({ postId, userId }) {
  const addComment = (postId, userId, comment) => {
    let body = {
      postId,
      userId,
      content: comment,
    };
    try {
      axios
        .post(backendUrl + "comments", body)
        .then((res) => {
          console.log("Response for addComment", res);
          setComment("");
        })
        .catch((error) => {
          console.log("Error in Network call while addComment:", error);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
  };
  const [comment, setComment] = useState("");
  return (
    <div>
      <div className="comment-box">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Enter your command here"
        />

        <Button
          onClick={() => addComment(postId, userId, comment)}
          variant="contained"
          className="comment-sent-button"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
