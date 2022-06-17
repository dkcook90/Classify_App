import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_SCHOOL } from "../../utils/mutation";

import { Alert, Form, Button } from "react-bootstrap";
import "./School.css";

const AddSchoolForm = () => {
	const [schoolFormData, setSchoolFormData] = useState({
		name: "",
		principal: "",
		budget: 0,
		image: "",
		address: "",
	});
	const [showAlert, setShowAlert] = useState(false);

	const [addSchool, { err }] = useMutation(ADD_SCHOOL);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setSchoolFormData({ ...schoolFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log("New School Submitted -");

		try {
			const { data } = await addSchool({
				variables: {
					...schoolFormData,
					budget: parseInt(schoolFormData.budget),
				},
			});
			console.log(data);

			if (!data) {
				throw new Error("something went wrong!");
			}

			setSchoolFormData({
				name: "",
				principal: "",
				budget: 0,
				image: "",
				address: "",
			});

			window.location.reload();
		} catch (error) {
			console.log("Caught", schoolFormData, error.networkError.result.errors);
			console.error(error.message);
			setShowAlert(true);
		}
	};

	return (
		<>
			<Form
				className="schoolForm bg-light m-3 p-3 rounded"
				onSubmit={handleFormSubmit}
			>
				<Alert
					dismissible
					onClose={() => setShowAlert(false)}
					show={showAlert}
					variant="danger"
				>
					Something went wrong!
				</Alert>
				<Form.Label className="mx-3">Create a New School</Form.Label>
				<Form.Group className="mx-3" controlId="schoolForm">
					<Form.Label>School Name:</Form.Label>
					<Form.Control
						className="mb-2"
						name="name"
						onChange={handleInputChange}
						value={schoolFormData.name}
						required
						type="input"
						placeholder="School Name"
					/>
					<Form.Label>Address:</Form.Label>
					<Form.Control
						className="mb-2"
						name="address"
						onChange={handleInputChange}
						value={schoolFormData.address}
						required
						type="input"
						placeholder="Address"
					/>
					<Form.Label>Principal:</Form.Label>
					<Form.Control
						className="mb-2"
						name="principal"
						onChange={handleInputChange}
						value={schoolFormData.principal}
						required
						type="input"
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
						step="0.01"
						placeholder="Budget"
					/>
					<Form.Label>Image URL address:</Form.Label>
					<Form.Control
						className="mb-2"
						name="image"
						onChange={handleInputChange}
						value={schoolFormData.image}
						type="input"
						placeholder="https:// ..."
					/>
					<Button variant="success" type="submit">
						ADD SCHOOL
					</Button>
				</Form.Group>
			</Form>
		</>
	);
};

export default AddSchoolForm;
