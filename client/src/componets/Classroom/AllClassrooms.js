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
import "./Classroom";
import { QUERY_ALLCLASSROOMS } from "../../utils/queries";
import { REMOVE_CLASSROOM } from "../../utils/mutation";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";

function AllClassrooms() {
	const { loading, error, data } = useQuery(QUERY_ALLCLASSROOMS);
	// console.log(data);
	const classrooms = data?.classrooms || [];

	const [removeClassroom] = useMutation(REMOVE_CLASSROOM);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	// console.log(classrooms);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	// console.log(teachers);

	// alphabetizes the classes roster
	const classesForSort = [...classrooms];
	const classesSorted = classesForSort.sort(function (a, b) {
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
	console.log(classesSorted);

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
							{classesSorted.map((clas) => {
								return (
									<Card className="m-1">
										<Card.Title className="m-1">
											<Card.Link href={`/classroom/${clas._id}`}>
												{clas.className}
											</Card.Link>
										</Card.Title>
										<ListGroupItem className="list-group-flush">
											Grade: {clas.grade}
										</ListGroupItem>
										<ListGroupItem className="list-group-flush">
											Departments:
											{clas.departments.map((dept) => (
												<div className="mx-1"> {dept.department}</div>
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
												href={`classroom/${clas._id}`}
												alt="Edit Classroom"
											>
												<img alt="edit Classroom" src={editIcon}></img>
											</Button>
											<Button
												className="mx-2 bg-danger"
												size="sm"
												variant="secondary"
												type=""
												alt="Delete Classroom"
												onClick={() => {
													removeClassroom({
														variables: { classroomId: clas._id },
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
				</>
			) : (
				<Link to="/">
					You need to be logged in to view this page. Please login.
				</Link>
			)}
		</div>
	);
}

export default AllClassrooms;
