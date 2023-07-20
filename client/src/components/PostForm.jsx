import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { backendUrl } from "../utils/Constants";
import { TextareaAutosize } from "@mui/material";

function PostForm() {
  const [formDetails, setFormDetails] = useState({
    postTitle: "",
    content: "",
  });

  const defaultTheme = createTheme();

  const { token } = useSelector((state) => state);

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
      axios
        .post(backendUrl + "posts", body)
        .then((res) => {
          console.log("Response", res);
          alert("Post created successfully");
        })
        .catch((err) => {
          console.log("Error in network call while handleSubmit", err.message);
        });
    } catch (error) {
      console.log("Error in handleSubmit", error);
    }
  };

  return (
    <div className="container-box">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="tilte"
                label="Title"
                name="title"
                autoFocus
              />
              <TextareaAutosize
                placeholder="Type the content to post"
                minRows={6}
                cols={50}
                autoFocus
                onChange={onChange}
                name="content"
                style={{ padding: "10px" }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default PostForm;
