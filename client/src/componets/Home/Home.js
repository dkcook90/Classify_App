import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Home.css";

function Home() {
	return (
		<>
			<div className="Container">
				<Form className="schoolForm">
					<Form.Group className="m-3" controlId="form">
						<Form.Label>School Name:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="School Name" />
                        <Form.Label>Principal:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="School Name" />
                        <Form.Label>Budget:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="School Name" />
					<Button variant="secondary" type="submit">
						ADD SCHOOL
					</Button>
                    <Button variant="secondary" type="submit">
						Edit SCHOOL
					</Button>
					</Form.Group>
				</Form>

                <Form className="departmentForm">
					<Form.Group className="m-3" controlId="form">
						<Form.Label>Department Name:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="Department Name" />
					<Button variant="secondary" type="submit">
						ADD DEPARTMENT
					</Button>
                    <Button variant="secondary" type="submit">
						EDIT DEPARTMENT
					</Button>
					</Form.Group>
				</Form>

                <Form className="teacherForm">
					<Form.Group className="m-3" controlId="form">
						<Form.Label>Teacher Name:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="Teacher Name" />
                        <Form.Label>Department:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="Teacher Name" />
                        <Form.Label>Office/Classroom:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="Teacher Name" />
					<Button variant="secondary" type="submit">
						ADD TEACHER
					</Button>
                    <Button variant="secondary" type="submit">
						EDIT TEACHER
					</Button>
					</Form.Group>
				</Form>

                <Form className="studentForm">
					<Form.Group className="m-3" controlId="form">
						<Form.Label>Student Name:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="Student Name" />
                        <Form.Label>Grade Level:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="Student Name" />
                        <Form.Label>Notes:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="Student Name" />
					<Button variant="secondary" type="submit">
						ADD STUDENT
					</Button>
                    <Button variant="secondary" type="submit">
						EDIT STUDENT
					</Button>
					</Form.Group>
				</Form>
			</div>
		</>
	);
}
export default Home;