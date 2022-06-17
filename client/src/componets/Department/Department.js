import React, { useState } from "react";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Department.css";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { QUERY_SCHOOL } from "../../utils/queries";
import { useParams, Link } from "react-router-dom";
import AddDepartmentToSchool from "./AddDepartmentSchool";

function Department() {
	let { id } = useParams();
	console.log(id);
	const { loading, data } = useQuery(QUERY_SCHOOL, {
		variables: { _id: id },
	});
	const school = data?.school || [];
	const deptList = school.department;

	return (
		<>
			<div className="m-3 departmentContainer">
				{Auth.loggedIn() ? (
					<>
						<Card style={{ width: "18rem" }}>
							<Card.Img
								variant="top"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Camberwell_High_School.jpg/1200px-Camberwell_High_School.jpg"
							/>
							<Card.Body>
								<Card.Title>{school.name}</Card.Title>
								<Card.Text>
									Use links listed below to access the teachers/classrooms for
									each department. (Might change this for each card to be a
									department and the list items to be teachers in that
									department.)
								</Card.Text>
								<ListGroup className="list-group-flush">
									{deptList ? (
										school.department.map((school) => {
											return (
												<ListGroupItem key={school.department._id}>
													<Card.Link href="#">{school.department}</Card.Link>
												</ListGroupItem>
											);
										})
									) : (
										<>loading...</>
									)}
								</ListGroup>
								<Button className="homeBttn" variant="">
									<Link className="backHome" to={"/schools"}>
										{" "}
										Back to Schools
									</Link>
								</Button>
							</Card.Body>
						</Card>

						<AddDepartmentToSchool />

						{/* <Form className="departmentForm" onSubmit={handleFormSubmit}>
          <Form.Group className="m-3" controlId="form">
            <Form.Label>Department Name:</Form.Label>
            <Form.Control
              className="mb-2"
              type="input"
              placeholder="Department Name"
              value={departmentState.department}
              onChange={(e) => setDepartmentState(e.target.value)}
            />
            <Button variant="secondary" type="submit">
              ADD DEPARTMENT
            </Button>
          </Form.Group>
        </Form> */}
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
export default Department;
