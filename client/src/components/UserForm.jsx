import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const UserForm = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
    name: "",
    bio: "",
  });

  const backendUrl = "https://feedapp.onrender.com/";

  console.log("formDetails", formDetails);

  const onChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formValues = { ...formDetails };
    console.log("formValues", formValues);
    try {
      axios
        .post(backendUrl + "users", formValues)
        .then((res) => console.log("Response", res));
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
    alert("user created successfully");
    setFormDetails({
      email: "",
      name: "",
      bio: "",
    });
  };

  return (
    <div className="container-box">
      <Form onSubmit={handleSubmit}>
        <h1>Create User</h1>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formDetails.name}
            onChange={onChange}
          />
        </Form.Group>

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

        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            name="bio"
            rows={3}
            placeholder="Enter bio"
            value={formDetails.bio}
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
