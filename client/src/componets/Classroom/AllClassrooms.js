import React from "react";
import { useQuery } from "@apollo/client";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
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
    <div className="allDepartmentContainer">
      <Card style={{ width: "18rem" }}></Card>
      <Card.Body>
        <Card.Title>Classrooms:</Card.Title>
        <Card.Text>
          Use links listed below to any of the classrooms for each school.
        </Card.Text>
        <ListGroup className="list-group-flush">
          {teachers.map((teacher) => {
            return (
              <ListGroupItem>
                <Card.Link href="#">{teacher.name}</Card.Link>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Card.Body>
    </div>
  );
}

export default AllClassrooms;
