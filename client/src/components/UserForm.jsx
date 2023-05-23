import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUserId } from "../Redux/action";
import { loadData, saveData } from "../utils/localStorage";
import { redirect, useNavigate } from "react-router-dom";
import { backendUrl } from "../Constants/Constants";

const UserForm = ({ isLogin }) => {
  const navigate = useNavigate();

  // ***** redux part *****
  const { userId, isLoading } = useSelector((state) => state);
  console.log("isLoading:", isLoading);
  console.log("userId:", userId);
  const dispatch = useDispatch();
  // ***************

  // const userId = loadData("userId");

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  console.log("formDetails", formDetails);

  const onChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formValues = { ...formDetails };
    dispatch(setIsLoading(true));
    try {
      let url = backendUrl + (isLogin ? "login" : "signup");
      console.log("Network calling to url", url);
      axios
        .post(url, formValues)
        .then((res) => {
          console.log("Response", res);
          alert(res.data.message);
          dispatch(setUserId(res.data.userId));
          dispatch(setIsLoading(false));
          saveData("userId", res.data.userId);
          saveData("username", res.data.username);
          saveData("role", res.data.userrole);
        })
        .catch((error) => {
          dispatch(setIsLoading(false));
          let message = error.response.data.message;
          let errors = error.response.data.errors;
          if (errors != null && errors.length > 0) {
            alert("Invalid Email or Password");
          } else if (message) {
            alert(message);
          }
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
    setFormDetails({
      email: "",
      password: "",
    });
  };

  if (userId) {
    navigate("/home");
  }

  if (isLoading) {
    return (
      <div className="loading-gif">
        <img
          src="https://media.tenor.com/hlKEXPvlX48AAAAi/loading-loader.gif"
          alt=""
        />
      </div>
    );
  }

  return (
    <div className="container-box">
      <Form onSubmit={handleSubmit}>
        <h1>{isLogin ? "Login" : "Signup"}</h1>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formDetails.email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter password"
            name="password"
            value={formDetails.password}
            onChange={onChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UserForm;
