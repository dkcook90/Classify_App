import React from "react";
import { useQuery } from "@apollo/client";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Department.css";
import { QUERY_ALLDEPT } from "../../utils/queries";
function AllDepartments() {
  const { loading, error, data } = useQuery(QUERY_ALLDEPT);
  console.log(data);
  const dept = data?.departments || [];
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(dept);
  return (
    <div className="allDepartmentContainer">
      <Card style={{ width: "18rem" }}></Card>
      <Card.Body>
        <Card.Title>Department</Card.Title>
        <Card.Text>
          Use links listed below to access the departments for each school.
        </Card.Text>
        <ListGroup className="list-group-flush">
          {dept.map((school) => {
            return (
              <ListGroupItem>
                <Card.Link href="#">{school.department}</Card.Link>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Card.Body>
    </div>
  );
}

export default AllDepartments;
