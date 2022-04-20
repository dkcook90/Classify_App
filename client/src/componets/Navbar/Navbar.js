import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Container, Offcanvas } from 'react-bootstrap'
import './Navbar.css';

function NavbarComp({ currentPage, handlePageChange }) {
  return (
    <div classname="navBarContainer">
      <Navbar className="navbar" bg="danger" variant="light" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="../../public/classifyLogo.png"
              width="80"
              height="80"
              className="d-inline-block align-top"
              />{' '}
            <span className="logoType">classify</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link 
                  href="#schools"
                  onClick={() => handlePageChange("Schools")}
                  className={
                  currentPage === "Schools" ? "nav-link active" : "nav-link"
                  }>
                    Schools
                </Nav.Link>
                <Nav.Link 
                  href="#departments"
                  onClick={() => handlePageChange("Departments")}
                  className={
                    currentPage === "Departments" ? "nav-link active" : "nav-link"
                  }>
                    Departments
                </Nav.Link>
                <Nav.Link 
                  href="#students"
                  onClick={() => handlePageChange("Students")}
                  className={
                    currentPage === "Students" ? "nav-link active" : "nav-link"
                  }>
                    Students
                </Nav.Link>
                <Nav.Link 
                  href="#logout"
                  onClick={() => handlePageChange("Logout")}
                  className={
                    currentPage === "Logout" ? "nav-link active" : "nav-link"
                  }>
                    Logout
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavbarComp;
