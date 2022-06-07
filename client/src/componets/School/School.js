import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
	Alert,
	Container,
	Form,
	Button,
	Card,
	ListGroup,
	ListGroupItem,
	Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";
import { QUERY_ALLSCHOOLS, QUERY_SCHOOL } from "../../utils/queries";
import { REMOVE_SCHOOL, UPDATE_SCHOOL } from "../../utils/mutation";

import AddSchoolForm from "./AddSchoolForm";
import "./School.css";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";
import Img1 from "../../img/Spring Hill High School.jpg";

function School() {
	const { loading, error, data } = useQuery(QUERY_ALLSCHOOLS);
	const schools = data?.schools;
	const [showAlert, setShowAlert] = useState(false);

	console.log(schools);

	const [updateSchool] = useMutation(UPDATE_SCHOOL);
	const [removeSchool] = useMutation(REMOVE_SCHOOL);

	// variable to show modal on button click
	const [show, setShow] = useState(false);
	// varibales to toggle the modal setShow state
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// variable and state variable that will capture the information from the edit school modal
	const [editSchoolData, setEditSchoolData] = useState({
		schoolId: "",
		name: "",
		principal: "",
		budget: 0,
	});
	const editFormInfo = (event) => {
		const { name, value } = event.target;
		setEditSchoolData({ ...editSchoolData, [name]: value });
	};

	// function to handle the submisison of editing a school's information
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log("Button Clicked");

		try {
			const { data } = await updateSchool({
				variables: {
					...editSchoolData,
					budget: parseInt(editSchoolData.budget),
				},
			});
			console.log(data);

			if (!data) {
				throw new Error("something went wrong!");
			}

			setEditSchoolData({
				schoolId: "",
				name: "",
				principal: "",
				budget: 0,
			});

			window.location.reload();
		} catch (error) {
			console.log("Caught", editSchoolData, error.networkError.result.errors);
			console.error(error.message);
			setShowAlert(true);
		}
	};

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
								<Card className="col-12 m-1" key={school._id}>
									<Card.Img className="cardImage" variant="top" src={Img1} />
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
													onClick={handleShow}
												>
													<img alt="edit school" src={editIcon}></img>
												</Button>
												{/* modal to edit a school */}

												<Modal show={show} onHide={handleClose}>
													<Modal.Header closeButton>
														<Modal.Title>Edit {school.name}'s Info</Modal.Title>
													</Modal.Header>
													<Modal.Body>
														<Form onSubmit={handleFormSubmit}>
															<Alert
																dismissible
																onClose={() => setShowAlert(false)}
																show={showAlert}
																variant="danger"
															>
																Something went wrong!
															</Alert>
															<Form.Group>
																<Form.Label>School Name</Form.Label>
																<Form.Control
																	onChange={editFormInfo}
																	name="name"
																	value={editSchoolData.name}
																	type="text"
																	placeholder={school.name}
																/>
															</Form.Group>
															<Form.Group>
																<Form.Label>Principal</Form.Label>
																<Form.Control
																	onChange={editFormInfo}
																	name="principal"
																	value={editSchoolData.principal}
																	type="text"
																	placeholder={school.principal}
																/>
															</Form.Group>
															<Form.Group>
																<Form.Label>Budget</Form.Label>
																<Form.Control
																	onChange={editFormInfo}
																	name="budget"
																	value={editSchoolData.budget}
																	type="number"
																	step="0.01"
																	placeholder={school.budget}
																/>
															</Form.Group>
														</Form>
													</Modal.Body>
													<Modal.Footer>
														<Button
															variant="primary"
															type="submit"
															onClick={handleClose}
														>
															Save Changes
														</Button>
													</Modal.Footer>
												</Modal>

												<Button
													className="mx-2 bg-danger"
													variant="secondary"
													type=""
													onClick={() => {
														removeSchool({
															variables: { schoolId: school._id },
														});
														window.location.reload();
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
