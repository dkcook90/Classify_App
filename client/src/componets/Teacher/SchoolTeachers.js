import React from "react";
import { useQuery } from "@apollo/client";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Teacher.css";
import { QUERY_SCHOOL } from "../../utils/queries";
import Auth from "../../utils/auth";
import { useParams, Link } from "react-router-dom";

function SchoolClassrooms() {
	let { id } = useParams();
	const { loading, error, data } = useQuery(QUERY_SCHOOL, {
		variables: { _id: id },
	});
	const school = data?.school || [];
	console.log(school);
	const teacherList = school.teachers;
	console.log(teacherList);
	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	// alphabetizes the teacher roster
	const teacherListForSort = [...teacherList];
	const teacherListSorted = teacherListForSort.sort(function (a, b) {
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
	// console.log(teacherListSorted);

	return (
		<div className="m-3 schoolClassroomContainer">
			{Auth.loggedIn() ? (
				<>
					<Card.Body>
						<Card.Title>Classrooms for {school.name}</Card.Title>
						<Card.Text>
							Use links listed below to view classes for each teacher.
						</Card.Text>
						<ListGroup className="list-group-flush">
							{teacherListSorted.map((teacher) => {
								return (
									<ListGroupItem>
										<Card.Link href={`/classroom/${teacher._id}`}>
											{teacher.name}
										</Card.Link>
									</ListGroupItem>
								);
							})}
						</ListGroup>
					</Card.Body>
					<Button className="homeBttn" variant="">
						<Link className="backHome" to={"/schools"}>
							{" "}
							Back to Schools
						</Link>
					</Button>
				</>
			) : (
				<Link to="/">
					You need to be logged in to view this page. Please login.
				</Link>
			)}
		</div>
	);
}

export default SchoolClassrooms;
