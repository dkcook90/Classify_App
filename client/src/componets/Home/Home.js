import React from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";
import "./Home.css";
import Image from "react-bootstrap/Image";

function Home() {
	return (
		<>
			<div className="Container">
				<Image
					className="homeBackground"
					src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2Nob29sfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
					fluid="true"
				></Image>
				<h1>Welcome to District 925!</h1>
				<ButtonGroup className="mb-2">
					<Button>Schools</Button>
					<Button>Departments</Button>
					<Button>Classrooms</Button>
					<Button>Students</Button>
				</ButtonGroup>

				<Form>
					<Form.Group className="mb-3" controlId="formSearch">
						<Form.Label>
							Enter name of Student or Teacher you would like to view.
						</Form.Label>
						<Form.Control type="search" placeholder="Search" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check type="checkbox" label="Student" />
						<Form.Check type="checkbox" label="Teacher" />
					</Form.Group>
					<Button variant="secondary" type="submit">
						Search
					</Button>
				</Form>
			</div>
		</>
	);
}
export default Home;
