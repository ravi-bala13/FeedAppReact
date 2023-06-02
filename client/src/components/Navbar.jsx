import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { clearLocalStorage } from "../utils/localStorage";
import { setUserId } from "../Redux/action";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function NavbarTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting token from cookie and parse
  const token = Cookies.get("token");
  console.log("token:", token);
  if (token) {
    let decodeToken = JSON.parse(atob(token.split(".")[1]));
    var { user_name: userName = null, role = null } = decodeToken.user;
  }

  const handleLogout = () => {
    // clear the token from the cookie by setting expiry date to the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
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
