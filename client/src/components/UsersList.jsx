import axios from "axios";
import React, { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  console.log("users", users);

  const backendUrl = "https://feedapp.onrender.com/";

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    try {
      axios.get(backendUrl + "users").then((res) => setUsers(res.data));
    } catch (error) {
      console.log("Error in getAllUsers", error);
    }
  };

  return (
    <div className="container-box long-box">
      {users.map((ele) => (
        <div>
          <div className="user-box">{ele.name}</div>
          <div className="bottom-box">
            <span>Like</span>
            <span>Dislike</span>
            <span>Edit</span>
            <span>Delete</span>
          </div>
        </div>
      ))}

      <div>
        <div className="user-box">hi</div>
        <div className="bottom-box">
          <span>Like</span>
          <span>Dislike</span>
          <span>Edit</span>
          <span>Delete</span>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
