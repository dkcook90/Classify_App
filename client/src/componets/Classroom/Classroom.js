import React from "react";
import { Form, Button, Card, ListGroupItem, ListGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Classroom.css";
import { QUERY_SINGLE_TEACHER } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom'
import  Auth  from "../../utils/auth";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";


function Classroom() {
  const {teacherId} = useParams();
  const {loading, error, data } = useQuery(QUERY_SINGLE_TEACHER, {variables: {teacherId: teacherId}});
  console.log(data);
  const teacher = data?.teacher || [];
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(teacher);
 
  return (
    <>
      <div className="m-3">
        {Auth.loggedIn() ? (
				<>
        <Container className="justify-content-center text-center">
            <Card className="border-end-0 border-start-0">
              <Card.Body>
                <Card.Header>
                <Card.Title className="fs-2 text-decoration-underline">{teacher.name}'s {teacher.department} class</Card.Title>
                <Card.Subtitle>Text with info about teacher and class.</Card.Subtitle>
                </Card.Header>
                <ListGroup className="list-group-flush">
                  {teacher.students.map((student) => {
                    return (
                      <ListGroupItem>
                        <Card.Link className="fs-4" href="#">{student.name}</Card.Link>
                        <Card.Text>Grade: {student.grade}</Card.Text>
                        <Card.Text>Notes: {student.note}</Card.Text>
                        <Button
                          className="mx-2 btn-sm bg-warning"
                          variant="secondary"
                          type=""
                        >
                          <img alt="edit school" src={editIcon}></img>
                        </Button>
                        <Button
                          className="mx-2 btn-sm bg-danger"
                          variant="secondary"
                          type=""
                        >
                          <img alt="delete school" src={deleteIcon}></img>
                        </Button>
                      </ListGroupItem>
                    )
                  })}
                </ListGroup>
                <Card.Footer>
                <Button variant="primary" href="/classroom">Back to All Classrooms</Button>
                </Card.Footer>
              </Card.Body>
            </Card>
            </Container>

          <div className="schoolContainer">
            <Form className="teacherForm">
              <Form.Group className="m-3" controlId="form">
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
                  placeholder="Teacher Name"
                />
                <Form.Label>Office/Classroom:</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="input"
                  placeholder="Teacher Name"
                />
                <Button variant="secondary" type="submit">
                  ADD TEACHER
                </Button>
                <Button variant="secondary" type="submit">
                  EDIT TEACHER
                </Button>
              </Form.Group>
            </Form>

            <Form className="studentForm">
              <Form.Group className="m-3" controlId="form">
                <Form.Label>Student Name:</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="input"
                  placeholder="Student Name"
                />
                <Form.Label>Grade Level:</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="input"
                  placeholder="Student Name"
                />
                <Form.Label>Notes:</Form.Label>
                <Form.Control
                  className="mb-2"
                  type="input"
                  placeholder="Student Name"
                />
                <Button variant="secondary" type="submit">
                  ADD STUDENT
                </Button>
                <Button variant="secondary" type="submit">
                  EDIT STUDENT
                </Button>
              </Form.Group>
            </Form>
          </div>
        </>
				) : (
					<Link to="/">You need to be logged in to view this page. Please 
					login.</Link>)}
    </div>
    </>
    
  );
}
export default Classroom;
