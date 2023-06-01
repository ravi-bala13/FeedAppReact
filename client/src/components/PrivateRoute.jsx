import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { setToken } from "../Redux/action";

function PrivateRoute({ children }) {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  dispatch(setToken(token));

  if (!token) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
}

export default PrivateRoute;
