import React from "react";
import { Route, Routes } from "react-router-dom";
import PostForm from "./PostForm";
import UsersList from "./UsersList";
import AdminPostForm from "./AdminPostForm";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import PrivateRoute from "./PrivateRoute";

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/userlist" element={<UsersList />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/postForm" element={<PostForm />} />
        <Route path="/adminPostForm" element={<AdminPostForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
