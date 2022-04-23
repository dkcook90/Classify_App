import React from "react";
import { useQuery } from "@apollo/client";

import  Auth  from "../../utils/auth";
import { QUERY_ALLDEPT } from "../../utils/queries";

import { Link } from "react-router-dom";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import "./Department.css";

function AllDepartments() {
  const { loading, error, data } = useQuery(QUERY_ALLDEPT);
  console.log(data);
  
  const dept = data?.departments || [];
  
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  console.log(dept);
  
  return (
    <div className="m-3 allDepartmentContainer">
      {Auth.loggedIn() ? (
				<>
      <Card style={{ width: "18rem" }}></Card>
      <Card.Body>
        <Card.Title>Departments:</Card.Title>
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
      </>
				) : (
					<Link to="/">You need to be logged in to view this page. Please 
					login.</Link>)}
    </div>
  );
}

export default AllDepartments;
