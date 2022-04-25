import React from "react";
import { Form, Button, ButtonGroup, Container } from "react-bootstrap";
import "./Home.css";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import HomeLibrary from "../../img/HomeLibrary.jpg";


import Auth from "../../utils/auth";

function Home() {
	return (
		<>
			<div>
			{Auth.loggedIn() ? (
				<>
				<Container className="justify-content-center text-center container row">
					<Image
						className="homeBackground"
						src={HomeLibrary}
						fluid="true"
					></Image>
					<ButtonGroup className="mb-2">
						<Button variant="primary" className="groupbtn">
							<Link className="backHome" to={"/schools"}>
								Schools
							</Link>
						</Button>
						<Button variant="primary" className="groupbtn">
							<Link className="backHome" to={"/departments"}>
								Departments
							</Link>
						</Button>
						<Button variant="primary" className="groupbtn">
							<Link className="backHome" to={"/classroom"}>
								Classrooms
							</Link>
						</Button>
					</ButtonGroup>
					<h1>Welcome to School District 925!</h1>
				</Container>
				<Form className="p-3">
					<Form.Group className="mb-3" controlId="formSearch">
						<Form.Label className="justify-content-center text-center container row">
							Enter name of Student or Teacher you would like to view.
						</Form.Label>
						<Form.Control type="search" placeholder="Search" />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Check type="checkbox" label="Student" />
						<Form.Check type="checkbox" label="Teacher" />
					</Form.Group>
					<Button variant="secondary" type="submit">
						Search
					</Button>
				</Form>
				</>
				) : (
					<Link to="/">You need to be logged in to view this page. Please 
					login.</Link>)}
			</div>
		</>
	);
}
export default Home;
