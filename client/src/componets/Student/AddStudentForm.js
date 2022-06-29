import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ADD_STU_SCHOOL, ADD_STUDENT } from "../../utils/mutation";

import { Alert, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

const AddStudentForm = () => {
	let { id } = useParams();
	const [studentFormData, setStudentFormData] = useState({
		studentId: "",
		name: "",
		grade: 0,
		note: "",
	});
	const [showAlert, setShowAlert] = useState(false);

	const [addStudent, { err }] = useMutation(ADD_STUDENT);
	const [addStuToSchool, { error }] = useMutation(ADD_STU_SCHOOL, {
		variables: { schoolId: id, studentId: studentFormData.studentId },
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setStudentFormData({
			...studentFormData,
			[name]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log("New Student Submitted -");

		try {
			const { data } = await addStudent({
				variables: {
					...studentFormData,
					grade: parseInt(studentFormData.grade),
				},
			});
			const { data: results } = await addStuToSchool({
				variable: {
					studentFormData,
				},
			});

			console.log(data);
			console.log(results);

			if (!data | !results) {
				throw new Error("something went wrong!");
			}

			setStudentFormData({
				_id: "",
				name: "",
				grade: 0,
				note: "",
			});

			// window.location.reload();
		} catch (error) {
			console.log("Caught", studentFormData, error.networkError.result.errors);
			console.error(error.message);
			setShowAlert(true);
		}
	};

	return (
		<>
			<Form
				className="studentForm bg-light m-3 p-3 rounded"
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
				<Form.Label className="mx-3">Enrole a New Student</Form.Label>
				<Form.Group className="mx-3" controlId="studentForm">
					<Form.Label>Student Name:</Form.Label>
					<Form.Control
						className="mb-2"
						name="name"
						onChange={handleInputChange}
						value={studentFormData.name}
						required
						type="input"
						placeholder="Student's Full Name"
					/>
					<Form.Label>Current Grade:</Form.Label>
					<Form.Control
						className="mb-2"
						name="grade"
						onChange={handleInputChange}
						value={studentFormData.grade}
						required
						type="number"
						placeholder="09"
					/>
					<Form.Label>Notes:</Form.Label>
					<Form.Control
						className="mb-2"
						name="note"
						onChange={handleInputChange}
						value={studentFormData.note}
						type="input"
						placeholder="Allergies, Info, Exceptions, Misc."
					/>
					<Button variant="success" type="submit">
						ADD STUDENT
					</Button>
				</Form.Group>
			</Form>
		</>
	);
};

export default AddStudentForm;
