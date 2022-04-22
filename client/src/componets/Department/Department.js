import React, { useState } from "react";
import { Form, Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Department.css";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SCHOOL } from "../../utils/queries";
import { ADD_DEPT_SCHOOL } from "../../utils/mutation";
import { useParams, Link } from "react-router-dom";

function Department() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_SCHOOL, {
    variables: { _id: id },
  });
  const school = data?.school || [];
  console.log(school);
  const deptList = school.department;
  console.log(deptList);

  const [departmentState, setDepartmentState] = useState({
    schoolId: "",
    departmentId: "",
  });
  const addDepartment = useMutation(ADD_DEPT_SCHOOL);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setDepartmentState({
      ...departmentState,
      [id]: value,
    });
  };

  const handleFormSubmit = async (e) =>{
    e.preventDefault();
    console.log(departmentState)
  }

  return (
    <>
      <div className="departmentContainer">
        <Card style={{ width: "18rem" }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>{school.name}</Card.Title>
            <Card.Text>
              Use links listed below to access the teachers/classrooms for each
              department. (Might change this for each card to be a department
              and the list items to be teachers in that department.)
            </Card.Text>
            <ListGroup className="list-group-flush">
              {deptList ? (
                school.department.map((school) => {
                  return (
                    <ListGroupItem>
                      <Card.Link key={school.department._id} href="#">{school.department}</Card.Link>
                    </ListGroupItem>
                  );
                })
              ) : (
                <h1>test</h1>
              )}
            </ListGroup>
            <Button variant="primary">
              <Link className="backHome" to={"/schools"}>
                {" "}
                Back to Schools
              </Link>
            </Button>
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
