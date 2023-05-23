import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function AdminPostForm() {
  const [formDetails, setFormDetails] = useState({
    user_id: "",
    content: "",
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  const [usersList, setUsersList] = useState(["bala"]);
  console.log("usersList:", usersList);

  const backendUrl = "https://feedappreact.onrender.com/";
  //   const backendUrl = "http://localhost:8080/";

  console.log("formDetails", formDetails);

  const onChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };

  const getAllUsers = () => {
    try {
      axios.get(backendUrl + "users").then((res) => setUsersList(res.data));
    } catch (error) {
      console.log("Error in getAllUsers", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      axios.post(backendUrl + "posts", formDetails).then((res) => {
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
        <Form.Group controlId="formPlace">
          {" "}
          {/* new form group for place */}
          <Form.Label>User</Form.Label>
          <Form.Control
            as="select"
            value={formDetails.user_id}
            name="user_id"
            onChange={onChange}
          >
            <option value="">Select a place</option>
            {usersList.map((ele, index) => (
              <option key={index} value={ele._id}>
                {ele.user_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

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

export default AdminPostForm;
