import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
	Button,
	Card,
	ListGroupItem,
	ListGroup,
	Container,
	Row,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./Student.css";
import { QUERY_SCHOOL, QUERY_ALLSTUDENTS } from "../../utils/queries";
import Auth from "../../utils/auth";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";
import AddStudentForm from "./AddStudentForm";
import { REMOVE_STUDENT } from "../../utils/mutation";

function Students() {
	let { id } = useParams();
	const { loading, error, data } = useQuery(QUERY_SCHOOL, {
		variables: { _id: id },
	});

	const school = data?.school || [];

	const students = data?.school.students || [];
	// console.log(students);

	const [removeStudent] = useMutation(REMOVE_STUDENT);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	// alphabetizes the Students roster
	const studentsForSort = [...students];
	const studentsSorted = studentsForSort.sort(function (a, b) {
		const nameA = a.name.toUpperCase(); // ignore upper and lowercase
		const nameB = b.name.toUpperCase(); // ignore upper and lowercase
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}
		// names must be equal
		return 0;
	});
	console.log(studentsSorted);

	return (
		<>
			<div className="m-3">
				{Auth.loggedIn() ? (
					<>
						<Container>
							<h1>{school.name} Students:</h1>
							<p>
								Use links listed below to view any of the Students for this
								school.
							</p>
							<Row className="row mb-3">
								{studentsSorted.map((student) => {
									return (
										<Card className="m-1">
											<Card.Title className="m-1">
												<Card.Link href={`/classroom/${student._id}`}>
													{student.name}
												</Card.Link>
											</Card.Title>
											<ListGroupItem className="list-group-flush">
												Grade: {student.grade}
											</ListGroupItem>
											<ListGroupItem className="list-group-flush">
												Note: {student.note}
											</ListGroupItem>
											<ListGroupItem className="list-group-flush">
												Classes:
												{student.classes?.map((classes) => (
													<div className="mx-1"> {classes.className}</div>
												))}
											</ListGroupItem>
											<Card.Body></Card.Body>
											<Card.Footer className="">
												<Button
													disabled
													className="mx-2 bg-warning"
													size="sm"
													variant="secondary"
													type=""
													href={`students/${student._id}`}
													alt="Edit Student"
												>
													<img alt="edit Student" src={editIcon}></img>
												</Button>
												<Button
													className="mx-2 bg-danger"
													size="sm"
													variant="secondary"
													type=""
													alt="Delete Student"
													onClick={() => {
														removeStudent({
															variables: { studentId: student._id },
														});
														window.location.reload();
													}}
												>
													<img alt="delete school" src={deleteIcon}></img>
												</Button>
											</Card.Footer>
										</Card>
									);
								})}
							</Row>
						</Container>

						{/* <AddStudentForm></AddStudentForm> */}
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

export default Students;
