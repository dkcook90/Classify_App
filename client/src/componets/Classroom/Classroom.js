import React from "react";
import { Form, Button, Card, ListGroupItem, ListGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Classroom.css";
import { QUERY_SINGLE_TEACHER } from "../../utils/queries";
import { REMOVE_STUDENT } from "../../utils/mutation";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from 'react-router-dom'
import  Auth  from "../../utils/auth";
import editIcon from "../../img/twotone_edit_white_24dp.png";
import deleteIcon from "../../img/twotone_delete_forever_white_24dp.png";


function Classroom() {
  const {teacherId} = useParams();
  const {loading, error, data } = useQuery(QUERY_SINGLE_TEACHER, {variables: {teacherId: teacherId}});
  const [removeStudent, { err }] = useMutation(REMOVE_STUDENT);
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
        <Container className="justify-content-center text-center container row mb-3">
          <h1 className="">{teacher.name}'s {teacher.department} Class</h1>
          {teacher.students.map((student) => (
            <Card className="col-12 m-2">
              <Card.Body>
                <Card.Header>
                  <Card.Title>{student.name}</Card.Title>
                </Card.Header>
                <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        <Card.Text><b>Grade Level:</b> {student.grade}</Card.Text>
                        <Card.Text><b>Notes:</b> {student.note}</Card.Text>
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
                          onClick={() => {
                            removeStudent({ variables: { studentId: student._id } })
                            window.location.reload()
                          }}
                        >
                          <img alt="delete school" src={deleteIcon}></img>
                        </Button>
                      </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          ))}
        </Container>

        <div className="schoolContainer">
            <Form className="studentForm bg-light m-2 p-3 rounded">
              <Form.Label className="mx-3">
                <h4>Add New Student</h4>
              </Form.Label>
              <Form.Group className="mx-3" controlId="form">
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
              </Form.Group>
            </Form>
            <Button className="m-2" variant="primary" href="/classroom">Back to All Classrooms</Button>
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
