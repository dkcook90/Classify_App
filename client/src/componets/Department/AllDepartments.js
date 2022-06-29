import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Department.css";
import { QUERY_ALLDEPT } from "../../utils/queries";
import { ADD_DEPT } from "../../utils/mutation";
import Auth from "../../utils/auth";

function AllDepartments() {
	const { loading, error, data } = useQuery(QUERY_ALLDEPT);
	const dept = data?.departments || [];

	const [departmentState, setDepartmentState] = useState({
		department: "",
	});
	const [addDepartment, { err }] = useMutation(ADD_DEPT);
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const results = await addDepartment({
				department: { departmentState },
			});
			console.log(results);
			setDepartmentState("");
		} catch (err) {
			console.error(err);
		}
	};

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	// alphabetizes the dept list
	const deptForSort = [...dept];
	const deptSorted = deptForSort.sort(function (a, b) {
		const departmentA = a.department.toUpperCase(); // ignore upper and lowercase
		const departmentB = b.department.toUpperCase(); // ignore upper and lowercase
		if (departmentA < departmentB) {
			return -1;
		}
		if (departmentA > departmentB) {
			return 1;
		}
		// departments must be equal
		return 0;
	});
	// console.log(deptSorted);

	return (
		<>
			<div className="m-3">
				{Auth.loggedIn() ? (
					<>
						<div className="allDepartmentContainer">
							<Card style={{ width: "18rem" }}>
								<Card.Body>
									<Card.Title>Departments:</Card.Title>
									<Card.Text>
										Use links listed below to access the departments for each
										school.
									</Card.Text>
									<ListGroup className="list-group-flush">
										{deptSorted.map((school) => {
											return (
												<ListGroupItem key={school.department}>
													<Card.Link href="#">{school.department}</Card.Link>
												</ListGroupItem>
											);
										})}
									</ListGroup>
								</Card.Body>
							</Card>
						</div>
						<Form className="departmentForm" onSubmit={handleFormSubmit}>
							<Form.Group className="m-3" controlId="form">
								<Form.Label>Add a Department:</Form.Label>
								<Form.Control
									className="mb-2"
									type="input"
									placeholder="Department Name"
									value={departmentState.department}
									onChange={(e) => setDepartmentState(e.target.value)}
								/>
								<Button
									className="addbtn"
									variant="secondary"
									type="submit"
									onClick={() => {
										addDepartment({
											variables: { department: departmentState },
										});
										window.location.reload();
									}}
								>
									ADD DEPARTMENT
								</Button>
								{/* <Button variant="secondary" type="submit">
              EDIT DEPARTMENT
            </Button> */}
							</Form.Group>
						</Form>
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

export default AllDepartments;
