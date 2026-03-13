import React from "react";
import { Form, FormControl, Button, Navbar, Container } from "react-bootstrap";
import "./AppNavbar.css";

export default function AppNavbar({ onSearch }) {
  return (
    <Navbar
      className="fixed-top navBox ml-5 font-weight-bolder"
      expand="lg"
      variant="light"
      bg="danger"
    >
      <Container>
        <Navbar.Brand float="right" text="light">
          1++ EPISODE
        </Navbar.Brand>
        <Form inline>
          <FormControl
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}
