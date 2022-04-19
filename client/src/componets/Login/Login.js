import React from "react";
import { Form, Button } from "react-bootstrap";

function Login() {
	return (
		<>
			<div className="loginContainer">
				<Form className="loginForm">
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Please enter credentials to log in.</Form.Label>
						<Form.Control type="user" placeholder="USERNAME" />
						<Form.Control type="email" placeholder="EMAIL" />
						<Form.Control type="password" placeholder="PASSWORD" />
					</Form.Group>
					<Button variant="secondary" type="submit">
						Log In
					</Button>
				</Form>
			</div>
		</>
	);
}
export default Login;
