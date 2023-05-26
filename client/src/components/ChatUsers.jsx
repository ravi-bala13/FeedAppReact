import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../Constants/Constants";
import { loadData } from "../utils/localStorage";

export default function ChatUsers({ setRecipient }) {
  const [usersList, setUsersList] = useState(["bala"]);
  const username = loadData("username");

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
    <div className="chat_users_container">
      {usersList.map((ele, index) => {
        if (username !== ele.user_name) {
          return (
            <div
              className="each_chat_user"
              onClick={() => setRecipient(ele.user_name)}
              key={index}
              value={ele._id}
            >
              <img
                className="chat_user_dp"
                src="https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png"
                alt=""
              />
              <div>{ele.user_name}</div>
            </div>
          );
        } else {
          return false;
        }
      })}
    </div>
  );
}
