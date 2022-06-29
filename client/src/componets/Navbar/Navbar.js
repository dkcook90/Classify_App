import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Container, Offcanvas } from "react-bootstrap";
import "./Navbar.css";
import Logo from "../../img/classifyLogo.png";
import Auth from "../../utils/auth";

function NavbarComp({ currentPage, handlePageChange }) {
	const logout = (event) => {
		event.preventDefault();
		Auth.logout();
	};

	return (
		<div className="navBarContainer">
			<Navbar className="navbar" bg="danger" variant="light" expand={false}>
				<Container fluid>
					<Navbar.Brand href="/home">
						<img
							alt="home"
							src={Logo}
							width="auto"
							height="80"
							className="d-inline-block align-top"
						/>{" "}
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
									href="/home"
									onClick={() => handlePageChange("Home")}
									className={
										currentPage === "Home" ? "nav-link active" : "nav-link"
									}
								>
									Home
								</Nav.Link>
								<Nav.Link
									href="/schools"
									onClick={() => handlePageChange("Schools")}
									className={
										currentPage === "Schools" ? "nav-link active" : "nav-link"
									}
								>
									Schools
								</Nav.Link>
								<Nav.Link
									href="/departments"
									onClick={() => handlePageChange("Departments")}
									className={
										currentPage === "Departments"
											? "nav-link active"
											: "nav-link"
									}
								>
									Departments
								</Nav.Link>
								<Nav.Link
									href="/teachers"
									onClick={() => handlePageChange("Teachers")}
									className={
										currentPage === "Teachers" ? "nav-link active" : "nav-link"
									}
								>
									Teachers
								</Nav.Link>
								<Nav.Link
									href="/classroom"
									onClick={() => handlePageChange("Classroom")}
									className={
										currentPage === "Classroom" ? "nav-link active" : "nav-link"
									}
								>
									Classrooms
								</Nav.Link>
								<Nav.Link
									href="/"
									onClick={logout}
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
