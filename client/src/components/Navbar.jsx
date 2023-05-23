import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearLocalStorage, loadData } from "../utils/localStorage";
import { useEffect, useState } from "react";
import { setUserId } from "../Redux/action";

function NavbarTop() {
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  if (userId == null) {
    // check local storage
    let userIdFromLocalStorage = loadData("userId");
    if (userIdFromLocalStorage) {
      dispatch(setUserId(userIdFromLocalStorage));
    }
  }

  const userName = loadData("username");
  const role = loadData("role");

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">FeedApp</Navbar.Brand>
          <Nav className="me-auto">
            {userId ? (
              <>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/postForm">Create Post</Nav.Link>
                {role == "ADMIN" ? (
                  <Nav.Link href="/adminPostForm">Admin</Nav.Link>
                ) : null}
              </>
            ) : null}
          </Nav>
          {userId ? (
            <Nav>
              <Nav.Link href="#">{userName}</Nav.Link>
              <Nav.Link
                href="#"
                onClick={() => {
                  dispatch(setUserId(""));
                  clearLocalStorage();
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarTop;
