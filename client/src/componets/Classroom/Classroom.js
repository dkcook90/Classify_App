import React from "react";
import {
	Form,
	Button,
	Card,
	ListGroupItem,
	ListGroup,
	Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Classroom.css";
import { QUERY_SINGLE_TEACHER } from "../../utils/queries";
import { REMOVE_STUDENT } from "../../utils/mutation";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import Auth from "../../utils/auth";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";

function Classroom() {
	const { teacherId } = useParams();
	const { loading, error, data } = useQuery(QUERY_SINGLE_TEACHER, {
		variables: { teacherId: teacherId },
	});
	// console.log(teacherId);
	// console.log(data);

	const [removeStudent, { err }] = useMutation(REMOVE_STUDENT);

	// loads classroom data and notifies of errors
	const teacher = data?.teacher || [];
	const classes = data?.teacher.classes || [];
	const departments = data?.teacher.departments || [];

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	// console.log(teacherId);

	// alphabetizes the class roster for the classroom
	const classListForSort = [...classes];
	const classListSorted = classListForSort.sort(function (a, b) {
		const nameA = a.className.toUpperCase(); // ignore upper and lowercase
		const nameB = b.className.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		// names must be equal
		return 0;
	});
	// console.log(classListSorted);

	return (
		<>
			<div className="m-3">
				{Auth.loggedIn() ? (
					<>
						<Container className="justify-content-center text-center container row mb-3">
							<h1 className="">{teacher.name}'s Departments</h1>
							{departments.map((dept) => (
								<Card className="col-12 m-2">
									<Card.Body>
										<Card.Header>
											<Card.Title>
												<Card.Link href="#">{dept.department}</Card.Link>
											</Card.Title>
										</Card.Header>
										<ListGroup className="list-group-flush">
											<ListGroupItem>
												<Card.Text>
													<b>Grade Level:</b> {dept.grade}
												</Card.Text>
												<Card.Text>
													<b>Notes:</b> {dept.note}
												</Card.Text>
											</ListGroupItem>
										</ListGroup>
									</Card.Body>
								</Card>
							))}
							<h1 className="mt-3">{teacher.name}'s Classes</h1>
							{classListSorted.map((clas) => (
								<Card className="col-12 m-2">
									<Card.Body>
										<Card.Header>
											<Card.Title>
												<Card.Link href="#">{clas.className}</Card.Link>
											</Card.Title>
										</Card.Header>
										<ListGroup className="list-group-flush">
											<ListGroupItem>
												<Card.Text>
													<b>Grade Level:</b> {clas.grade}
												</Card.Text>
												<Card.Text>
													<b>Notes:</b> {clas.note}
												</Card.Text>
											</ListGroupItem>
										</ListGroup>
									</Card.Body>
								</Card>
							))}
						</Container>

						<div className="schoolContainer">
							{/*<Form className="studentForm bg-light m-2 p-3 rounded">
								<Form.Label className="mx-3">
									<h4>Add New Student</h4>
								</Form.Label>
								<Form.Group className="mx-3" controlId="form">
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
										placeholder="Grade Level"
									/>
									<Form.Label>Notes:</Form.Label>
									<Form.Control
										className="mb-2"
										type="input"
										placeholder="Notes"
									/>
									<Button className="addbtn" variant="secondary" type="submit">
										ADD STUDENT
									</Button>
								</Form.Group>
							</Form> */}
							<Button className="m-2" variant="primary" href="/classroom">
								Back to Teacher's List
							</Button>
						</div>
					</>
				) : (
					<Link to="/">
						You need to be logged in to view this page. Please login.
					</Link>
				)}
			</div>
		</>
	);
}
export default Classroom;
