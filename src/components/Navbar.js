import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
//import NavDropdown from "react-bootstrap/NavDropdown";

const AppNavbar = () => {
  let location = useLocation();

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand>CloudNotes</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link
                to="/"
                className={`${
                  location.pathname === "/" ? "active" : ""
                } nav-link`}
              >
                Home
              </Link>

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
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
