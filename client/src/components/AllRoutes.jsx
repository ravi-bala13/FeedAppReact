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
        <Route path="/postlist" element={<PostsList />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/postForm" element={<PostForm />} />
      </Routes>
    </div>
  );
}
