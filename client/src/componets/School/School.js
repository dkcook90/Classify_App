import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
	Container,
	Button,
	Card,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";
import { QUERY_ALLSCHOOLS } from "../../utils/queries";
import { REMOVE_SCHOOL } from "../../utils/mutation";

import AddSchoolForm from "./AddSchoolForm";
import "./School.css";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";
import Img1 from "../../img/Spring Hill High School.jpg";

function School() {
	const { loading, error, data } = useQuery(QUERY_ALLSCHOOLS);
	const schools = data?.schools || [];
	// console.log(schools);

	const [removeSchool] = useMutation(REMOVE_SCHOOL);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	// alphabetizes the schools list
	const schoolsForSort = [...schools];
	const schoolsSorted = schoolsForSort.sort(function (a, b) {
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
	// console.log(schoolsSorted);

	return (
		<>
			<div className="schoolContainer m-3">
				{Auth.loggedIn() ? (
					<>
						<Container className="container row mb-3">
							<h1>Schools in District:</h1>
							{schoolsSorted.map((school) => (
								<Card className="col-12 m-1">
									<Card.Img
										className="cardImage"
										variant="top"
										src={school.image}
									/>
									<Card.Body>
										<Card.Title>{school.name}</Card.Title>

										<ListGroup className="list-group-flush">
											<ListGroupItem className="list-group-flush">
												Address: {school.address}
											</ListGroupItem>
											<ListGroupItem className="list-group-flush">
												Principal: {school.principal}
											</ListGroupItem>
											<ListGroupItem className="list-group-flush">
												Budget: ${school.budget}
											</ListGroupItem>
											<ListGroupItem className="list-group-flush">
												<Card.Link href={`departments/${school._id}`}>
													Departments
												</Card.Link>
											</ListGroupItem>
											<ListGroupItem className="list-group-flush">
												<Card.Link href={`teachers/${school._id}`}>
													Teachers
												</Card.Link>
											</ListGroupItem>
											<ListGroupItem className="list-group-flush">
												<Card.Link href={`students/${school._id}`}>
													Students
												</Card.Link>
											</ListGroupItem>
										</ListGroup>
										<Card.Body></Card.Body>
										<Card.Footer>
											<Button
												className="mx-2 bg-warning"
												variant="secondary"
												type=""
												href={`schools/${school._id}`}
												alt="Edit School"
											>
												<img alt="edit school" src={editIcon}></img>
											</Button>
											<Button
												className="mx-2 bg-danger"
												variant="secondary"
												type=""
												alt="Delete School"
												onClick={() => {
													removeSchool({
														variables: { schoolId: school._id },
													});
													window.location.reload();
												}}
											>
												<img alt="delete school" src={deleteIcon}></img>
											</Button>
										</Card.Footer>
									</Card.Body>
								</Card>
							))}
						</Container>

						<AddSchoolForm></AddSchoolForm>
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
export default School;
