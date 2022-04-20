import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Auth } from "../../utils/auth";
import { QUERY_SCHOOL } from "../../utils/queries";
import { ADD_SCHOOL, UPDATE_SCHOOL, REMOVE_SCHOOL } from "../../utils/mutation";

import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./School.css";

function School() {
	return (
		<>
			<div className="schoolContainer">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Spring Hill High School</Card.Title>
                        <Card.Text>
                            Text with address or other school info like head Admin Taylor Brown and budget of $250000. Need to make these cards dynamically by mapping through each item in the array.
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Card.Link href="#">Link to school's departments</Card.Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Link href="#">Link to school's teachers</Card.Link>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Link href="#">Link to school's students</Card.Link>
                            </ListGroupItem>
                        </ListGroup>
                        <Button variant="primary">Back to Home</Button>
                    </Card.Body>
                </Card>
                
                <Form className="schoolForm">
					<Form.Group className="m-3" controlId="form">
						<Form.Label>School Name:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="School Name" />
                        <Form.Label>Principal:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="School Name" />
                        <Form.Label>Budget:</Form.Label>
						<Form.Control className="mb-2" type="input" placeholder="School Name" />
					<Button variant="secondary" type="submit">
						ADD SCHOOL
					</Button>
                    <Button variant="secondary" type="submit">
						Edit SCHOOL
					</Button>
					</Form.Group>
				</Form>
			</div>
		</>
	);
}
export default School;
