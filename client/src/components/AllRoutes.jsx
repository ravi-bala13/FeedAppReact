import React from "react";
import { Route, Routes } from "react-router-dom";
import PostForm from "./PostForm";
import UserForm from "./UserForm";
import UsersList from "./UsersList";
import PostsList from "./PostsList";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/userlist" element={<UsersList />} />
        <Route path="/home" element={<PostsList />} />
        <Route path="/login" element={<UserForm isLogin={true} />} />
        <Route path="/signup" element={<UserForm isLogin={false} />} />
      </Routes>
    </div>
  );
}
