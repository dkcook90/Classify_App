import React from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";
import "./Home.css";
import QUERY_USER from "../../utils/queries";

function Home() {
	return (
		<>
			<div className="Container">
				<h1>Welcome user.role, user.username</h1>
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
