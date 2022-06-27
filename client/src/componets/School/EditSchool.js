import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Alert, Container, Form, Button, Card, Img } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import Auth from "../../utils/auth";
import { QUERY_SCHOOL } from "../../utils/queries";
import { UPDATE_SCHOOL } from "../../utils/mutation";

// import "./School.css";
import Img1 from "../../img/Spring Hill High School.jpg";

const EditSchool = () => {
	const [showAlert, setShowAlert] = useState(false);

	//queries a single school to use with the edit school function via modal
	const { schoolId } = useParams();

	const { loading, data } = useQuery(QUERY_SCHOOL, {
		// pass URL parameter
		variables: { _id: schoolId },
	});

	const school = data?.school || {};
	// console.log(school._id);

	const [updateSchool, { err }] = useMutation(UPDATE_SCHOOL);

	// variable and state variable that will capture the information from the edit school modal
	const [editSchoolData, setEditSchoolData] = useState({
		schoolId: schoolId,
		name: "",
		principal: "",
		budget: "",
		image: "",
		address: "",
	});
	const editFormInfo = (event) => {
		const { name, value } = event.target;
		setEditSchoolData({
			...editSchoolData,
			[name]: value,
		});
	};

	// function to handle the submisison of editing a school's information
	const handleSchoolUpdate = async (event) => {
		event.preventDefault();
		console.log("Button Clicked", editSchoolData.schoolId);

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
				budget: "",
				image: "",
				address: "",
			});

			window.location.reload();
		} catch (error) {
			console.log("Caught", editSchoolData, error.networkError);
			console.error(error.message);
			setShowAlert(true);
		}
	};

	return (
		<>
			<div className="schoolContainer m-3">
				{Auth.loggedIn() ? (
					<>
						<Container className="container row mb-3">
							<Card>
								<Card.Header>
									<Card.Title>Edit {school.name}'s Info</Card.Title>
									<Card.Img
										className="cardImage"
										variant="top"
										src={school.image}
									/>
								</Card.Header>
								<Card.Body>
									<Form>
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
											<Form.Label>Address</Form.Label>
											<Form.Control
												onChange={editFormInfo}
												name="address"
												value={editSchoolData.address}
												type="text"
												placeholder={school.address}
											/>
											<Form.Label>Principal</Form.Label>
											<Form.Control
												onChange={editFormInfo}
												name="principal"
												value={editSchoolData.principal}
												type="text"
												placeholder={school.principal}
											/>
											<Form.Label>Budget</Form.Label>
											<Form.Control
												onChange={editFormInfo}
												name="budget"
												value={editSchoolData.budget}
												type="number"
												step="0.01"
												placeholder={school.budget}
											/>
											<Form.Label>Image URL</Form.Label>
											<Form.Control
												onChange={editFormInfo}
												name="image"
												value={editSchoolData.image}
												type="text"
												placeholder={school.image}
											/>
										</Form.Group>
									</Form>
								</Card.Body>
								<Card.Footer>
									<Button
										variant="primary"
										type="submit"
										onClick={handleSchoolUpdate}
									>
										Save Changes
									</Button>
								</Card.Footer>
							</Card>
						</Container>
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
		</>
	);
};

export default EditSchool;
