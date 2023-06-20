import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { backendUrl } from "../utils/Constants";
import "../css/CommentBox.css";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function CommentBox({ postId, userId }) {
  const [allComments, setAllComments] = useState([
    {
      created_at: new Date(),
      content: "",
      likes: 0,
      replies: [],
      user_id: {
        user_name: "",
      },
    },
  ]);
  const [comment, setComment] = useState("");

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
          getAllComments();
        })
        .catch((error) => {
          console.log("Error in Network call while addComment:", error);
        });
    } catch (error) {
      console.log("Error in addComment", error);
    }
  };

  const getAllComments = () => {
    const url = `${backendUrl}comments/${postId}`;
    try {
      axios
        .get(url)
        .then((res) => {
          console.log("Response for getAllComments", res);
          setAllComments(res.data);
        })
        .catch((error) => {
          console.log("Error in Network call while getAllComments:", error);
        });
    } catch (error) {
      console.log("Error in getAllComments", error);
    }
  };

  useEffect(() => {
    getAllComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // right now this function only concern about hours and day..need to thing about week month
  const calculateTimeDiff = (timestamp) => {
    const commentTime = new Date(timestamp);
    const currentTime = new Date();

    // Calculate the time difference in milliseconds
    const diffInMs = currentTime - commentTime;

    // Convert the time difference to hours
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMs < 3600000) {
      // Time difference is within 60 min, show as 'Xm'
      let difInMin = Math.floor(diffInMs / 1000 / 60);
      return `${difInMin}m`;
    } else if (diffInHours < 24) {
      // Time difference is within 24 hours, show as 'Xh'
      return `${diffInHours}h`;
    } else {
      // Time difference is more than 24 hours, show as 'Xd'
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

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

      <div className="comment-section">
        {allComments.map((comment, i) => (
          <div className="each-comment" key={i}>
            <div>
              <Avatar
                className="avatar-comment"
                sx={{ bgcolor: deepPurple[500] }}
              >
                {comment.user_id.user_name
                  ? comment.user_id.user_name[0].toUpperCase()
                  : null}
              </Avatar>
            </div>
            <div className="comment-details">
              <div className="comment-username">
                {comment.user_id.user_name}{" "}
                <span className="time-diff">
                  {calculateTimeDiff(comment.created_at)}
                </span>
              </div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-actions">
                <span>Like</span>
                <span>Reply</span>
                <span>ShowReplies</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
