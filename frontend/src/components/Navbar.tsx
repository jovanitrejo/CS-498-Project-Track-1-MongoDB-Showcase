import React from "react";
import ReactBootstrapNavbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router";

const Navbar = (): React.JSX.Element => {
  return (
    <ReactBootstrapNavbar expand="md" bg="light">
      <Container fluid>
        <ReactBootstrapNavbar.Brand href="#home">
          CS 498: Data Management in The Cloud
        </ReactBootstrapNavbar.Brand>
        <ReactBootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
};

export default Navbar;
