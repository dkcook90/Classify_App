import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Department.css";
import { QUERY_ALLDEPT } from "../../utils/queries";
import { ADD_DEPT } from "../../utils/mutation";
function AllDepartments() {
  const { loading, error, data } = useQuery(QUERY_ALLDEPT);
  const dept = data?.departments || [];

  const [departmentState, setDepartmentState] = useState({
    department: "",
  });
  const [addDepartment, { err }] = useMutation(ADD_DEPT)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = await addDepartment({
        department: { departmentState },
      });
      console.log(results);
      setDepartmentState("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="allDepartmentContainer">
        <Card style={{ width: "18rem" }}></Card>
        <Card.Body>
          <Card.Title>Departments:</Card.Title>
          <Card.Text>
            Use links listed below to access the departments for each school.
          </Card.Text>
          <ListGroup className="list-group-flush">
            {dept.map((school) => {
              return (
                <ListGroupItem key={school.department}>
                  <Card.Link href="#">{school.department}</Card.Link>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Card.Body>
      </div>
      <Form className="departmentForm" onSubmit={handleFormSubmit}>
        <Form.Group className="m-3" controlId="form">
          <Form.Label>Department Name:</Form.Label>
          <Form.Control
            className="mb-2"
            type="input"
            placeholder="Department Name"
            value={departmentState.department}
            onChange={(e) => setDepartmentState(e.target.value)}
          />
          <Button className="addbtn" variant="secondary" type="submit" onClick={() => {
												addDepartment({ variables: { department: departmentState } })
												window.location.reload()
											}}>
            ADD DEPARTMENT
          </Button>
          {/* <Button variant="secondary" type="submit">
              EDIT DEPARTMENT
            </Button> */}
        </Form.Group>
      </Form>
    </>
  );
}

export default AllDepartments;
