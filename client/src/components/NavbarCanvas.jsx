import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUserId } from "../Redux/action";
import { clearLocalStorage } from "../utils/localStorage";
import { BsFillChatLeftTextFill } from "react-icons/bs";

function NavbarCanvas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, userName, role } = useSelector((state) => state);

  const handleLogout = () => {
    navigate("/login");
    dispatch(setToken(null));
  };
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          bg="primary"
          variant="dark"
          sticky="top"
          key={expand}
          expand={expand}
          //   className="bg-body-tertiary mb-3"
        >
          <Container fluid>
            <Navbar.Brand href="#">
              <img width={"40px"} src="logo.png" alt="logo img" />
              <Navbar.Brand href="/">FeedApp</Navbar.Brand>
            </Navbar.Brand>
            <Navbar.Text className="navbar-canvas-chat-icon">
              {token ? (
                <Nav.Link href="/chatPage">
                  <BsFillChatLeftTextFill />
                </Nav.Link>
              ) : null}
            </Navbar.Text>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img width={"40px"} src="logo.png" alt="logo img" />
                  <Navbar.Brand href="/">FeedApp</Navbar.Brand>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
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
                    <NavDropdown
                      title={userName}
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#action3">
                        My Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Settings
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
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
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarCanvas;
