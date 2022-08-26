import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import NavDropdown from "react-bootstrap/NavDropdown";

const AppNavbar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand>CloudNotes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {localStorage.getItem("token") && (
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/" ? "active" : ""
                  } nav-link`}
                >
                  Home
                </Link>
              )}

              <Link
                to="/about"
                className={`${
                  location.pathname === "/about" ? "active" : ""
                } nav-link`}
              >
                About
              </Link>
            </Nav>
          </Navbar.Collapse>
          <form className="d-flex">
            {!localStorage.token ? (
              <>
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <a
                  className="btn btn-primary mx-2"
                  onClick={logout}
                  role="button"
                >
                  Logout
                </a>
              </>
            )}
          </form>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
