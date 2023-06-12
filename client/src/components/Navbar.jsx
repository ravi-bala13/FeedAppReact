import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearLocalStorage } from "../utils/localStorage";
import { setToken, setUserId } from "../Redux/action";
import { useNavigate } from "react-router-dom";

function NavbarTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state);

  if (token) {
    let decodeToken = JSON.parse(atob(token.split(".")[1]));
    var { user_name: userName = null, role = null } = decodeToken.user;
  }

  const handleLogout = () => {
    navigate("/login");
    dispatch(setToken(null));
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="#home">FeedApp</Navbar.Brand>
          <Nav className="me-auto">
            {token ? (
              <>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/postForm">Create Post</Nav.Link>
                {role === "ADMIN" ? (
                  <Nav.Link href="/adminPostForm">Admin</Nav.Link>
                ) : null}
              </>
            ) : null}
          </Nav>
          {token ? (
            <Nav>
              <Nav.Link href="#">{userName}</Nav.Link>
              <Nav.Link
                href="#"
                onClick={() => {
                  dispatch(setUserId(""));
                  clearLocalStorage();
                  handleLogout();
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
