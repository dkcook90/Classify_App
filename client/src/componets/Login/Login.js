import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

function Login() {
	return (
		<>
			<div className="loginContainer">
				<Form className="loginForm">
					<Form.Group className="m-3" controlId="formBasicEmail">
						<Form.Label>Please enter credentials to log in:</Form.Label>
						<Form.Control className="mb-2" type="email" placeholder="EMAIL" />
						<Form.Control className="mb-2" type="password" placeholder="PASSWORD" />
					<Button variant="secondary" type="submit">
						Log In
					</Button>
					</Form.Group>
				</Form>
			</div>
		</>
	);
}
export default Login;
