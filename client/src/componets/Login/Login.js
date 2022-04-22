import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutation";
import "./Login.css";

import Auth from "../../utils/auth";

const Login = (props) => {
	const [formState, setFormState] = useState({ email: "", password: "" });
	const [login, { error, data }] = useMutation(LOGIN_USER);

	// update state based on form input changes
	// const handleChange = (event) => {
	// 	const { name, value } = event.target;

	// 	setFormState({
	// 		...formState,
	// 		[name]: value,
	// 	});
	// };

	// submit form
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		console.log(formState);
		try {
			const { data } = await login({
				variables: { ...formState },
			});

			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		}

		// clear form values
		// setFormState({
		// 	email: "",
		// 	password: "",
		// });
	};

	return (
		<>
			<div className="loginContainer">
				<Form
					className="border bg-light p-5 loginForm"
					onSubmit={handleFormSubmit}
				>
					<Form.Group className="m-3" controlId="formBasicEmail">
						<Form.Label>Please enter credentials to log in:</Form.Label>
						<Form.Control className="mb-2" type="email" placeholder="EMAIL" />
					</Form.Group>
					<Form.Group className="m-3" controlId="formBasicPassword">
						<Form.Control
							className="mb-2"
							type="password"
							placeholder="PASSWORD"
						/>
					</Form.Group>
					<Button className="loginbtn" variant="secondary" type="submit">
						Log In
					</Button>
				</Form>
			</div>
		</>
	);
};
export default Login;
