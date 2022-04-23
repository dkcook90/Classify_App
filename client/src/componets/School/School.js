import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { REMOVE_SCHOOL } from "../../utils/mutation";

// import { Auth } from "../../utils/auth";
import { QUERY_ALLSCHOOLS, QUERY_SCHOOL } from "../../utils/queries";
// import { ADD_SCHOOL, UPDATE_SCHOOL, REMOVE_SCHOOL } from "../../utils/mutation";

import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./School.css";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";

function School() {
	const { loading, error, data } = useQuery(QUERY_ALLSCHOOLS);
	const schools = data?.schools
	console.log(schools);

	const [removeSchool, { err }] = useMutation(REMOVE_SCHOOL);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return (
		<>
			<div className="schoolContainer">
				<section className="container row m-3">
					<h1>Schools in District:</h1>
					{schools.map((school) => (
						<Card className="col-12 m-1" key={school._id}>
							<Card.Body>
								<Card.Title>{school.name}</Card.Title>
								<Card.Text>
									Address: <br />
									{school.principle} <br />
									{school.budget} <br />
								</Card.Text>
								<ListGroup className="list-group-flush">
									<ListGroupItem>
										<Card.Link href={`departments/${school._id}`}>
											Link to school's departments
										</Card.Link>
									</ListGroupItem>
									<ListGroupItem>
										<Card.Link href={`classrooms/${school._id}`}>
											Link to school's classrooms
										</Card.Link>
									</ListGroupItem>
									<ListGroupItem>
										<Button
											className="mx-2 bg-warning"
											variant="secondary"
											type=""
										>
											<img alt="edit school" src={editIcon}></img>
										</Button>
										<Button
											className="mx-2 bg-danger"
											variant="secondary"
											type=""
											onClick={() => {
												removeSchool({ variables: { schoolId: school._id } })
												window.location.reload()
											}}
										>
											<img alt="delete school" src={deleteIcon}></img>
										</Button>
									</ListGroupItem>
								</ListGroup>
							</Card.Body>
						</Card>
					))}
				</section>

				<Form className="schoolForm">
					<Form.Label style={{ fontWeight: "bold" }}>
						Create a New School
					</Form.Label>
					<Form.Group className="m-3" controlId="form">
						<Form.Label>School Name:</Form.Label>
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="School Name"
						/>
						<Form.Label>Principal:</Form.Label>
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="School Name"
						/>
						<Form.Label>Budget:</Form.Label>
						<Form.Control
							className="mb-2"
							type="input"
							placeholder="School Name"
						/>
						<Button variant="secondary" type="submit">
							ADD SCHOOL
						</Button>
					</Form.Group>
				</Form>
			</div>
		</>
	);
}
export default School;
