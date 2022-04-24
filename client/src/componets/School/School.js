import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import  Auth  from "../../utils/auth";
import { QUERY_ALLSCHOOLS, QUERY_SCHOOL } from "../../utils/queries";
import { ADD_SCHOOL, REMOVE_SCHOOL } from "../../utils/mutation";

import { Form, Button, Card, ListGroup, Alert, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./School.css";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";

function School() {
	const { loading, error, data } = useQuery(QUERY_ALLSCHOOLS);
	const schools = data?.schools
	console.log(schools);

	const [schoolFormData, setSchoolFormData] = useState({ name: "", principle: "", budget:"" });
	const [showAlert, setShowAlert] = useState(false);
	const [addSchool, {er}] = useMutation(ADD_SCHOOL);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSchoolFormData({ ...schoolFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(schoolFormData);

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		// console.log("reached try/catch")
		try {
			const { data } = await addSchool({
				variables: { ...schoolFormData },
			});

			if (!data) {
				throw new Error("something went wrong!");
			}
		} catch (err) {
			console.error(err);
			setShowAlert(true);
		}

		setSchoolFormData({
			name: "", principle: "", budget:"",
		});
	}

	const [removeSchool, { err }] = useMutation(REMOVE_SCHOOL);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return (
		<>
			<div className="m-3 schoolContainer">
			{Auth.loggedIn() ? (
				<>
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

				<Form className="border bg-light p-5 loginForm schoolForm" onSubmit={handleFormSubmit}>
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant="danger"
				>
					Something went wrong with your school input!
				</Alert>
					<Form.Label style={{ fontWeight: "bold" }}>
						Create a New School
					</Form.Label>
					<Form.Group className="m-3" controlId="form">
						<Form.Label>School Name:</Form.Label>
						<Form.Control
							className="mb-2"
							name="name"
							onChange={handleInputChange}
							value={schoolFormData.name}
							required
							type="text"
							placeholder="School Name"
						/>
						<Form.Label>Principle:</Form.Label>
						<Form.Control
							className="mb-2"
							name="principle"
							onChange={handleInputChange}
							value={schoolFormData.principle}
							required
							type="text"
							placeholder="Principal"
						/>
						<Form.Label>Budget:</Form.Label>
						<Form.Control
							className="mb-2"
							name="budget"
							onChange={handleInputChange}
							value={schoolFormData.budget}
							required
							type="number"
							placeholder="Budget"
						/>
						<Button variant="success" type="submit">
							ADD SCHOOL
						</Button>
					</Form.Group>
				</Form>
				</>
				) : (
					<Link to="/">You need to be logged in to view this page. Please 
					login.</Link>)}
			</div>
		</>
	);
}
export default School;
