import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Alert, Container, Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import  Auth  from "../../utils/auth";
import { QUERY_ALLSCHOOLS, QUERY_SCHOOL } from "../../utils/queries";
import { ADD_SCHOOL, REMOVE_SCHOOL } from "../../utils/mutation";

import AddSchoolForm from "./AddSchoolForm"
import "./School.css";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";
import Img1 from "../../img/Spring Hill High School.jpg";

function School() {
	const { loading, error, data } = useQuery(QUERY_ALLSCHOOLS);
	const schools = data?.schools

	console.log(schools);

	const [schoolFormData, setSchoolFormData] = useState({ name: "", principal: "", budget:"" });
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
			name: "", principal: "", budget:"",
		});
	}


	const [removeSchool, { err }] = useMutation(REMOVE_SCHOOL);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return (
		<>
			<div className="schoolContainer m-3">
			{Auth.loggedIn() ? (
				<>
				<Container className="container row mb-3">
					<h1>Schools in District:</h1>
					{schools.map((school) => (
						<Card className="col-12 m-1" key={school._id}>
							<Card.Img className="cardImage" variant="top" src={Img1}/>
							<Card.Body>
								<Card.Title>{school.name}</Card.Title>
								<Card.Text>
									Address: <br />
									{school.principal} <br />
									{school.budget} <br />
								</Card.Text>
								<ListGroup className="list-group-flush">
									<ListGroupItem>
										<Card.Link href={`departments/${school._id}`}>
											{school.name}'s Departments
										</Card.Link>
									</ListGroupItem>
									<ListGroupItem>
										<Card.Link href={`classrooms/${school._id}`}>
											{school.name}'s Classrooms
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
				</Container>


				{/* <Form className="schoolForm bg-light m-3 p-3 rounded" onSubmit={handleFormSubmit}>
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant="danger"
				>
					Something went wrong with your school input!
				</Alert>
					<Form.Label className="mx-3">
						<h4>Create a New School:</h4>
					</Form.Label>
					<Form.Group className="mx-3" controlId="form">
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
						<Form.Label>principal:</Form.Label>
						<Form.Control
							className="mb-2"
							name="principal"
							onChange={handleInputChange}
							value={schoolFormData.principal}
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
				</Form> */}

				<AddSchoolForm></AddSchoolForm>

				</>
				) : (
					<Link to="/">You need to be logged in to view this page. Please 
					login.</Link>)}
			</div>
		</>
	);
}
export default School;
