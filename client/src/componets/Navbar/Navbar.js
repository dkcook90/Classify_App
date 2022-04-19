import React from "react";
<<<<<<< HEAD
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Container, Offcanvas } from 'react-bootstrap'
import './Navbar.css';
=======
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
>>>>>>> main

function NavbarComp({ currentPage, handlePageChange }) {
	return (
		<div classname="navBarContainer">
<<<<<<< HEAD
			<Navbar bg="light" variant="light" fixed="top">
				<Container>
=======
			<Navbar bg="light" variant="light" fixed="top" expand={false}>
				<Container fluid>
>>>>>>> main
					<Navbar.Brand href="#home">
						<img
							alt=""
							src="../public/classifyLogo.png"
							width="auto"
							height="80"
							className="d-inline-block align-top"
						/>{" "}
						classify
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="offcanvasNavbar" />
<<<<<<< HEAD
						<Navbar.Offcanvas
						id="offcanvasNavbar"
						aria-labelledby="offcanvasNavbarLabel"
						placement="end"
						>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
=======
					<Navbar.Offcanvas
						id="offcanvasNavbar"
						aria-labelledby="offcanvasNavbarLabel"
						placement="end"
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title id="offcanvasNavbarLabel"></Offcanvas.Title>
>>>>>>> main
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className="me-auto">
								<Nav.Link
									href="#schools"
									onClick={() => handlePageChange("Schools")}
									className={
										currentPage === "Schools" ? "nav-link active" : "nav-link"
									}
								>
									Schools
								</Nav.Link>
<<<<<<< HEAD

=======
>>>>>>> main
								<Nav.Link
									href="#departments"
									onClick={() => handlePageChange("Departments")}
									className={
<<<<<<< HEAD
										currentPage === "Departments" ? "nav-link active" : "nav-link"
=======
										currentPage === "Departments"
											? "nav-link active"
											: "nav-link"
>>>>>>> main
									}
								>
									Departments
								</Nav.Link>
								<Nav.Link
									href="#students"
									onClick={() => handlePageChange("Students")}
									className={
										currentPage === "Students" ? "nav-link active" : "nav-link"
									}
								>
									Students
								</Nav.Link>
								<Nav.Link
									href="#logout"
									onClick={() => handlePageChange("Logout")}
									className={
										currentPage === "Logout" ? "nav-link active" : "nav-link"
									}
								>
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
