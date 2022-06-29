import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_ALLDEPT } from "../../utils/queries";
import { ADD_TEACHER } from "../../utils/mutation";

import { Alert, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "./Teacher.css";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

const AddTeacherForm = () => {
	// queries all departments for new teacher function
	// const { data } = useQuery(QUERY_ALLDEPT);
	// const deptResults = data?.departments || [];
	// console.log(data);

	const [teacherFormData, setTeacherFormData] = useState({
		name: "",
		office: "",
	});
	const [showAlert, setShowAlert] = useState(false);

	const [addTeacher, { err }] = useMutation(ADD_TEACHER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setTeacherFormData({
			...teacherFormData,
			[name]: value,
		});
	};

	// const handleSelect = (e) => {
	// 	console.log(e);
	// 	setTeacherFormData(e);
	// 	console.log(teacherFormData);
	// 	addTeacher({
	// 		variables: {
	// 			departmentId: teacherFormData.departmentId,
	// 		},
	// 	});
	// };

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log("New Teacher Submitted -");

		try {
			const { data } = await addTeacher({
				variables: {
					...teacherFormData,
					budget: parseInt(teacherFormData.budget),
				},
			});
			console.log(data);

			if (!data) {
				throw new Error("something went wrong!");
			}

			setTeacherFormData({
				name: "",
				office: "",
			});

			window.location.reload();
		} catch (error) {
			console.log("Caught", teacherFormData, error.networkError.result.errors);
			console.error(error.message);
			setShowAlert(true);
		}
	};

	return (
		<>
			<Form
				className="teacherForm bg-light m-3 p-3 rounded"
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
				<Form.Label className="mx-3">Add a New Teacher</Form.Label>
				<Form.Group className="mx-3" controlId="teacherForm">
					<Form.Label>Teacher Name:</Form.Label>
					<Form.Control
						className="mb-2"
						name="name"
						onChange={handleInputChange}
						value={teacherFormData.name}
						required
						type="input"
						placeholder="Teacher's Full Name"
					/>
					<Form.Label>Office Number:</Form.Label>
					<Form.Control
						className="mb-2"
						name="office"
						onChange={handleInputChange}
						value={teacherFormData.office}
						required
						type="input"
						placeholder="Office"
					/>
					{/* <Form.Label>Departments:</Form.Label>
					<Form.Control
						className="mb-2"
						name="departments"
						onChange={handleInputChange}
						value={teacherFormData.departments}
						type="input"
						placeholder="Departments"
					/> */}
					{/* <Form.Label
						title="Click to Choose Departments"
						className="deptBttn mb-2"
						id="dropdown-menu-align-right"
						onSelect={handleInputChange}
						name="departments"
					></Form.Label>
					{deptResults.map((data) => {
						<Form.Check
							eventKey={data._id}
							key={data._id}
							value={teacherFormData.departments}
							onSelect={handleInputChange}
							name="departments"
						>
							{data.department}
						</Form.Check>;
					})} */}
					<Button variant="success" type="submit">
						ADD TEACHER
					</Button>
				</Form.Group>
			</Form>
		</>
	);
};

export default AddTeacherForm;
