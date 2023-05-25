import React from "react";
import { Route, Routes } from "react-router-dom";
import PostForm from "./PostForm";
import UserForm from "./UserForm";
import UsersList from "./UsersList";
import PostsList from "./PostsList";
import AdminPostForm from "./AdminPostForm";
import Home from "./Home";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/userlist" element={<UsersList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/postForm" element={<PostForm />} />
        <Route path="/adminPostForm" element={<AdminPostForm />} />
        <Route path="/login" element={<UserForm isLogin={true} />} />
        <Route path="/signup" element={<UserForm isLogin={false} />} />
      </Routes>
    </div>
  );
}
