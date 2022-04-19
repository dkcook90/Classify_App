import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

function NavbarComp({ currentPage, handlePageChange }) {
	return (
		<div classname="navBarContainer">
			<Navbar bg="light" variant="light">
				<Container>
					<Navbar.Brand href="#home">
						<img
							alt=""
							src="../public/classifyLogo.png"
							width="80"
							height="80"
							className="d-inline-block align-top"
						/>{" "}
						classify
					</Navbar.Brand>
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

						<Nav.Link
							href="#departments"
							onClick={() => handlePageChange("Departments")}
							className={
								currentPage === "Departments" ? "nav-link active" : "nav-link"
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
				</Container>
			</Navbar>
		</div>
	);
}
export default Navbar;
