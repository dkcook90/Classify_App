import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import {
	Card,
	ListGroup,
	ListGroupItem,
	Button,
	Container,
	Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import AddTeacherForm from "./AddTeacherForm";
import "./Teacher.css";
import { QUERY_ALLTEACHERS } from "../../utils/queries";
import { REMOVE_TEACHER } from "../../utils/mutation";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";

function Teachers() {
	const { loading, error, data } = useQuery(QUERY_ALLTEACHERS);
	const teachers = data?.teachers || [];
	// console.log(teachers);

	const [removeTeacher] = useMutation(REMOVE_TEACHER);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	// console.log(teachers);

	// alphabetizes the teachers roster
	const teachersForSort = [...teachers];
	const teachersSorted = teachersForSort.sort(function (a, b) {
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
	// console.log(teachersSorted);

	return (
		<div className="m-3 allDepartmentContainer">
			{Auth.loggedIn() ? (
				<>
					<Container>
						<h1>District Teachers:</h1>
						<p>
							Use links listed below to view any of the Teachers for each
							school.
						</p>
						<Row className="row mb-3">
							{teachersSorted.map((teacher) => {
								return (
									<Card className="m-1">
										<Card.Title className="m-1">
											<Card.Link href={`/classroom/${teacher._id}`}>
												{teacher.name}
											</Card.Link>
										</Card.Title>
										<ListGroupItem className="list-group-flush">
											Office: {teacher.office}
										</ListGroupItem>
										<ListGroupItem className="list-group-flush">
											Departments:
											{teacher.departments.map((dept) => (
												<div className="mx-1"> {dept.department}</div>
											))}
										</ListGroupItem>
										<ListGroupItem className="list-group-flush">
											Classes:
											{teacher.classes.map((dept) => (
												<div className="mx-1"> {dept.className}</div>
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
												href={`teachers/${teacher._id}`}
												alt="Edit Teacher"
											>
												<img alt="edit teacher" src={editIcon}></img>
											</Button>
											<Button
												className="mx-2 bg-danger"
												size="sm"
												variant="secondary"
												type=""
												alt="Delete Teacher"
												onClick={() => {
													removeTeacher({
														variables: { teacherId: teacher._id },
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

					<AddTeacherForm></AddTeacherForm>
				</>
			) : (
				<Link to="/">
					You need to be logged in to view this page. Please login.
				</Link>
			)}
		</div>
	);
}

export default Teachers;
