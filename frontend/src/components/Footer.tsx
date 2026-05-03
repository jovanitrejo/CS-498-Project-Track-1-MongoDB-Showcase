import React from "react";
import Container from "react-bootstrap/Container";

const Footer = (): React.JSX.Element => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <Container className="p-4">
        <p className="text-center">CS 498: Data Management in The Cloud</p>
      </Container>
    </footer>
  );
};

export default Footer;
