import React from "react";
import { useQuery } from "@apollo/client";
import  Auth  from "../../utils/auth";
import { Form, Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Classroom";
import { QUERY_ALLCLASSROOMS } from "../../utils/queries";
function AllClassrooms() {
  const { loading, error, data } = useQuery(QUERY_ALLCLASSROOMS);
  console.log(data);
  const teachers = data?.teachers || [];
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(teachers);
  
  return (
    <div className="m-3 allDepartmentContainer">
      {Auth.loggedIn() ? (
				<>
      <Card className="col-12 m-2">
        <Card.Body>
          <Card.Title>Classrooms:</Card.Title>
          <Card.Text>
            Use links listed below to any of the classrooms for each school.
          </Card.Text>
          <ListGroup className="list-group-flush">
            {teachers.map((teacher) => {
              return (
                <ListGroupItem>
                  <Card.Link href={`/classroom/${teacher._id}`}>{teacher.name}</Card.Link>
                </ListGroupItem>
              );
            })}
          </ListGroup>
      </Card.Body>
      </Card>
      </>
				) : (
					<Link to="/">You need to be logged in to view this page. Please 
					login.</Link>)}
    
          <Form className="teacherForm bg-light m-2 p-3 rounded">
              <Form.Label className="mx-3">
                <h4>Add New Classroom:</h4>
              </Form.Label>
              <Form.Group className="mx-3" controlId="form">
                <Form.Label>Teacher Name:</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="input"
                  placeholder="Teacher Name"
                />
                <Form.Label>Department:</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="input"
                  placeholder="Department"
                />
                <Form.Label>Office/Classroom:</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="input"
                  placeholder="Office/Classroom"
                />
                <Button className="addbtn" variant="secondary" type="submit">
                  ADD CLASSROOM
                </Button>
              </Form.Group>
            </Form>
</div>
  );
}

export default AllClassrooms;
