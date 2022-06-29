import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import {
	Form,
	Card,
	ListGroup,
	ListGroupItem,
	Button,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Teacher.css";
import { QUERY_ALLTEACHERS, QUERY_ALLDEPT } from "../../utils/queries";
import { ADD_DEPT_SCHOOL } from "../../utils/mutation";

function Teachers() {
	const { loading, error, data } = useQuery(QUERY_ALLTEACHERS);
	const teachers = data?.teachers || [];
	// console.log(data);

	// queries all departments for new teacher function
	const { data: dataD } = useQuery(QUERY_ALLDEPT);
	const deptResults = dataD?.departments || [];
	console.log(dataD);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;
	// console.log(teachers);

	// alphabetizes the teachers roster
	const teachersForSort = [...teachers];
	const teachersSorted = teachersForSort.sort(function (a, b) {
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
	// console.log(teachersSorted);

	return (
		<div className="m-3 allDepartmentContainer">
			{Auth.loggedIn() ? (
				<>
					<Card.Body>
						<Card.Title>District Teachers:</Card.Title>
						<Card.Text>
							Use links listed below to any of the Teachers for each school.
						</Card.Text>
						<ListGroup className="list-group-flush">
							{teachersSorted.map((teacher) => {
								return (
									<ListGroupItem>
										<Card.Link href={`/classroom/${teacher._id}`}>
											{teacher.name}
											{" --- "}
											{teacher.office}
										</Card.Link>
									</ListGroupItem>
								);
							})}
						</ListGroup>
					</Card.Body>
					<Form className="teacherForm bg-light m-2 p-3 rounded">
						<Form.Label className="mx-3">
							<h4>Add New Teacher:</h4>
						</Form.Label>
						<Form.Group className="mx-3" controlId="form">
							<Form.Label>Teacher Name:</Form.Label>
							<Form.Control
								className="mb-2"
								type="input"
								placeholder="Teacher Name"
							/>
							<DropdownButton
								title="Click to Choose a Department"
								className="deptBttn m-2"
								id="dropdown-menu-align-right"
								// onSelect={handleSelect}
							>
								{deptResults ? (
									deptResults.map((data) => {
										return (
											<Dropdown.Item
												eventKey={data._id}
												key={data._id}
												value={data.department}
											>
												{data.department}
											</Dropdown.Item>
										);
									})
								) : (
									<>loading...</>
								)}
							</DropdownButton>
							<Form.Label>Office/Classroom:</Form.Label>
							<Form.Control
								className="mb-2"
								type="input"
								placeholder="Office/Classroom"
							/>
							<Button className="addbtn" variant="secondary" type="submit">
								ADD TEACHER
							</Button>
						</Form.Group>
					</Form>{" "}
				</>
			) : (
				<Link to="/">
					You need to be logged in to view this page. Please login.
				</Link>
			)}
		</div>
	);
}

export default Teachers;
