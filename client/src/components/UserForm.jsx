import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const UserForm = ({ isLogin }) => {
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
