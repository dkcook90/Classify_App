import React from "react";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Department.css";
import { useQuery } from "@apollo/client";
import { QUERY_SCHOOL } from "../../utils/queries";
import { useParams } from "react-router-dom";
import DepartmentList from './DepartmentList'

function Department() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_SCHOOL, {
    variables: { _id: id },
  });
  const school = data?.school || [];
  console.log(school);

  return (
    <>
      <div className="departmentContainer">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{school.name}</Card.Title>
            <Card.Text>
              Use links listed below to access the teachers/classrooms for each
              department. (Might change this for each card to be a department
              and the list items to be teachers in that department.)
            </Card.Text>
            <ListGroup className="list-group-flush">
				{/* <DepartmentList departments= {school.department}/> */}
              {/* {school.map((school) => {
                return (
                  <ListGroupItem>
                    <Card.Link href="#">{school.department}</Card.Link>
                  </ListGroupItem>
                );
              })} */}
              <ListGroupItem>
                <Card.Link href="#">Custodial</Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="#">Science</Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="#">English</Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="#">Math</Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="#">Political Science</Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="#">History</Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="#">Art</Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="#">Computer Science</Card.Link>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Link href="#">Physical Education</Card.Link>
              </ListGroupItem>
            </ListGroup>
            <Button variant="primary">Back to Home</Button>
          </Card.Body>
        </Card>

        <Form className="departmentForm">
          <Form.Group className="m-3" controlId="form">
            <Form.Label>Department Name:</Form.Label>
            <Form.Control
              className="mb-2"
              type="input"
              placeholder="Department Name"
            />
            <Button variant="secondary" type="submit">
              ADD DEPARTMENT
            </Button>
            <Button variant="secondary" type="submit">
              EDIT DEPARTMENT
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
export default Department;
