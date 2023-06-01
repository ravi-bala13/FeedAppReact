import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { backendUrl } from "../utils/Constants";
import Cookies from "js-cookie";

function PostForm() {
  const [formDetails, setFormDetails] = useState({
    content: "",
  });

  const token = Cookies.get("token");

  const onChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let body = {
      token,
      content: formDetails.content,
    };
    try {
      axios.post(backendUrl + "posts", body).then((res) => {
        console.log("Response", res);
        alert("Post created successfully");
      });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
  };

  return (
    <div className="container-box">
      <Form onSubmit={handleSubmit}>
        <h1>Create Post</h1>

        <Form.Group controlId="bio">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            rows={3}
            placeholder="Enter conent of the post"
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
}

export default PostForm;
