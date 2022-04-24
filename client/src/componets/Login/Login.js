import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutation";
import "./Login.css";

import Auth from "../../utils/auth";

const LoginForm = () => {
	const [userFormData, setUserFormData] = useState({ email: "", password: "" });
	const [validated] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [loginUser, { error }] = useMutation(LOGIN_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(userFormData);

		// check if form has everything (as per react-bootstrap docs)
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		try {
			const { data } = await loginUser({
				variables: { ...userFormData },
			});

			if (!data) {
				throw new Error("something went wrong!");
			}

			Auth.login(data.login.token);
			//
		} catch (err) {
			console.error(err);
			setShowAlert(true);
		}

		setUserFormData({
			email: "",
			password: "",
		});
	};

	return (
		<>
			<div className="loginContainer">
				<Form
					className="border bg-light p-5 loginForm"
					noValidate
					validated={validated}
					onSubmit={handleFormSubmit}
				>
					<Alert
						dismissible
						onClose={() => setShowAlert(false)}
						show={showAlert}
						variant="danger"
					>
						Something went wrong with your login credentials!
					</Alert>
					<Form.Group controlId="formEmail">
						<Form.Label>Please enter credentials to log in:</Form.Label>
						<Form.Control
							className="mb-2"
							type="email"
							name="email"
							placeholder="EMAIL"
							onChange={handleInputChange}
							value={userFormData.email}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Email is required!
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group controlId="formPassword">
						<Form.Control
							className="mb-2"
							type="password"
							name="password"
							placeholder="PASSWORD"
							onChange={handleInputChange}
							value={userFormData.password}
							required
						/>
						<Form.Control.Feedback type="invalid">
							Password is required!
						</Form.Control.Feedback>
					</Form.Group>
					<Button
						className="loginbtn"
						variant="success"
						type="submit"
						disabled={!(userFormData.email && userFormData.password)}
					>
						Log In
					</Button>
				</Form>
			</div>
		</>
	);
};
export default LoginForm;
