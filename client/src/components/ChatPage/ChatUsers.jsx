import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../../utils/Constants";
import { Avatar, Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useSelector } from "react-redux";

export default function ChatUsers({ setRecipient }) {
  const [usersList, setUsersList] = useState(["bala"]);

  const { userName } = useSelector((state) => state);

  const getAllUsers = () => {
    try {
      axios.get(backendUrl + "users").then((res) => setUsersList(res.data));
    } catch (error) {
      console.log("Error in getAllUsers", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Box borderRadius={8} boxShadow={3} className="chat_users_container">
      {usersList.map((ele, index) => {
        if (userName !== ele.user_name) {
          return (
            <div
              className="each_chat_user"
              onClick={() => setRecipient(ele.user_name)}
              key={index}
              value={ele._id}
            >
              <Avatar className="avatar" sx={{ bgcolor: deepPurple[500] }}>
                {ele.user_name ? ele.user_name[0].toUpperCase() : null}
              </Avatar>
              <div>{ele.user_name}</div>
            </div>
          );
        } else {
          return false;
        }
      })}
    </Box>
  );
}
