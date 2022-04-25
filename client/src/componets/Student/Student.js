import React from "react";
import { Form, Button, Card, ListGroupItem, ListGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Student.css";
// import { QUERY_SINGLE_STUDENT } from "../../utils/queries";
// import { EDIT_STUDENT } from "../../utils/mutation";
// import { useQuery, useMutation } from "@apollo/client";
// import { useParams } from 'react-router-dom'
import  Auth  from "../../utils/auth";
import editIcon from "../../img/twotone_edit_white_24dp.png";


function Student() {
//   const {teacherId} = useParams();
//   const {loading, error, data } = useQuery(QUERY_SINGLE_TEACHER, {variables: {teacherId: teacherId}});
//   const [updateStudent, { err }] = useMutation(EDIT_STUDENT);
//   console.log(data);
//   const teacher = data?.teacher || [];
//   if (loading) return 'Loading...';
//   if (error) return `Error! ${error.message}`;
//   console.log(teacher);

 
  return (
    <>
      <div className="m-3">
        {Auth.loggedIn() ? (
				<>
        <Container className="justify-content-center text-center container row mb-3">
            <h1 className="">{student.name}</h1>
            <Card className="col-12 m-2">
              <Card.Body>
                <Card.Header>
                  <Card.Title>{student.name}</Card.Title>
                </Card.Header>
                <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        <Card.Text><b>Notes:</b> {student.note}</Card.Text>
                        <Form>
                            <Form.Group className="mb-3" controlId="formGrade">
                                <Form.Label><b>Grade Level:</b> {student.grade}</Form.Label>
                                <Form.Control type="grade" placeholder="Grade Level" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formNote">
                                <Form.Label><b>Notes:</b> {student.note}</Form.Label>
                                <Form.Control type="note" placeholder="Notes" />
                            </Form.Group>
                            <Button
                            className="mx-2 btn-sm bg-warning"
                            variant="secondary"
                            type=""
                            // onClick={() => {
                            //     updateStudent({ variables: { studentId: student._id } })
                            //     window.location.reload()
                            //   }}
                            >
                            <img alt="edit school" src={editIcon}></img>
                            </Button>
                        </Form>        
                      </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
        </Container>

        <div className="schoolContainer">
            <Button variant="primary">
                <Link className="backHome" to={"/classroom"}>
                    {" "}
                    Back to Classroom
                </Link>
            </Button>
        </div>
        </>
				) : (
					<Link to="/">You need to be logged in to view this page. Please 
					login.</Link>)}
    </div>
    </>
  );
}

export default Student;
