import React from "react";
import { Form, Button, Card, ListGroupItem, ListGroup } from "react-bootstrap";
import "./Classroom.css";

function Classroom() {
	return (
		<>
			<div className="schoolContainer">
				<Card style={{ width: "18rem" }}>
					<Card.Img variant="top" src="holder.js/100px180" />
					<Card.Body>
						<Card.Title>Mr. Paxton's Math Class </Card.Title>
						<Card.Text>Text with info about teacher and class.</Card.Text>
						<ListGroup className="list-group-flush">
							<ListGroupItem>
								<Card.Link href="#">Student 1</Card.Link>
							</ListGroupItem>
							<ListGroupItem>
								<Card.Link href="#">Student 1</Card.Link>
							</ListGroupItem>
							<ListGroupItem>
								<Card.Link href="#">Student 1</Card.Link>
							</ListGroupItem>
						</ListGroup>
						<Button variant="primary">Back to Home</Button>
					</Card.Body>
				</Card>

				<Form className="teacherForm">
					<Form.Group className="m-3" controlId="form">
						<Form.Label>Teacher Name:</Form.Label>
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="Teacher Name"
						/>
						<Form.Label>Department:</Form.Label>
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="Teacher Name"
						/>
						<Form.Label>Office/Classroom:</Form.Label>
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="Teacher Name"
						/>
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
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="Student Name"
						/>
						<Form.Label>Grade Level:</Form.Label>
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="Student Name"
						/>
						<Form.Label>Notes:</Form.Label>
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="Student Name"
						/>
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
export default Classroom;
