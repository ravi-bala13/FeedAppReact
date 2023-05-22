import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../Redux/action";
import { loadData, saveData } from "../utils/localStorage";
import { redirect, useNavigate } from "react-router-dom";

const UserForm = ({ isLogin }) => {
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  console.log("state:", state);
  const dispatch = useDispatch();

  const userId = loadData("userId");

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  console.log("formDetails", formDetails);

  const backendUrl = "https://feedappreact.onrender.com/";

  const onChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formValues = { ...formDetails };
    try {
      let url = backendUrl + (isLogin ? "login" : "signup");
      axios
        .post(url, formValues)
        .then((res) => {
          console.log("Response", res);
          alert(res.data.message);
          dispatch(setUserId(res.data.userId));
          saveData("userId", res.data.userId);
          saveData("username", res.data.username);
        })
        .catch((error) => {
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
    alert("redirecting");
    navigate("/home");
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
