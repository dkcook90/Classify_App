import React from "react";
import { useQuery } from "@apollo/client";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Classroom.css";
import { QUERY_SCHOOL } from "../../utils/queries";
import { useParams, Link } from "react-router-dom";

function SchoolClassrooms() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_SCHOOL, {
    variables: { _id: id },
  });
  const school = data?.school || [];
  console.log(school);
  const teacherList = school.teachers;
  console.log(teacherList);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="schoolClassroomContainer">
      <Card style={{ width: "18rem" }}></Card>
      <Card.Body>
        <Card.Title>Classrooms for {school.name}</Card.Title>
        <Card.Text>
          Use links listed below to view classes for each teacher.
        </Card.Text>
        <ListGroup className="list-group-flush">
          {teacherList.map((teacher) => {
            return (
              <ListGroupItem>
                <Card.Link href={`/classroom/${teacher._id}`}>
                  {teacher.name}
                </Card.Link>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Card.Body>
      <Button variant="primary"><Link className="backHome" to={'/schools'}> Back to Schools</Link></Button>
    </div>
  );
}

export default SchoolClassrooms;