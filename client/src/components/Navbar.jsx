import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearLocalStorage, loadData } from "../utils/localStorage";
import { useEffect, useState } from "react";
import { setUserId } from "../Redux/action";

function NavbarTop() {
  const [userLogined, setUserLogined] = useState(false);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  // const [userId, setUserId] = useState("");
  // const [userName, setUserName] = useState("");

  // useEffect(() => {
  //   let user_id = loadData("userId");
  //   if (user_id) {
  //     setUserId(loadData("userId"));
  //     setUserLogined(true);
  //   }

  //   setUserName(loadData("username"));
  // }, []);

  // const userId = loadData("userId");
  const userName = loadData("username");

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">FeedApp</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {userId ? <Nav.Link href="/postform">Create Post</Nav.Link> : null}
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
