import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="light" expand="lg" style={{'zIndex': 1000}}>
      <Navbar.Brand href="/">App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="#other">Other</Nav.Link>
        </Nav>
        <Button variant="primary" onClick={() => alert('Button clicked!')}>
          Click me!
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
