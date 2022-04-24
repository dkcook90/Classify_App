import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./Department.css";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_ALLDEPT } from "../../utils/queries";
import { ADD_DEPT_SCHOOL } from "../../utils/mutation";
import { useParams } from "react-router-dom";

function AddDepartmentToSchool() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(QUERY_ALLDEPT);
  const deptResults = data?.departments || [];
  console.log(deptResults);
  console.log(data);
  const [departmentState, setDepartmentState] = useState({
    departmentId: "",
  });
  const [addDepartment, { err }] = useMutation(ADD_DEPT_SCHOOL, {
    variables: { schoolId: id, departmentId: departmentState },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(departmentState);
    try {
      const { data } = await addDepartment({
        variable: { departmentState },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (deptResults) {
    return (
      <>
        <Form.Label>Please Choose A Department to Add</Form.Label>
        <Form className="addDepartmentOption" onSubmit={handleFormSubmit}>
          <Form.Group className="m-3" controlId="form">
            <Form.Select>
              <Form.Control
                className="mb-2"
                type="select"
                value={departmentState.departmentId}
                onChange={(e) => setDepartmentState(e.target.value)}
              />
              <option>Choose a Department</option>
              {deptResults ? (
                deptResults.map((data) => {
                  return (
                    <option key={data._id} value={data._id}>
                      {data.department}
                    </option>
                  );
                })
              ) : (
                <h1>test</h1>
              )}
            </Form.Select>
            <Button
              variant="secondary"
              type="submit"
              onClick={() => {
                addDepartment({ variables: { department: departmentState } });
              }}
            >
              ADD DEPARTMENT
            </Button>
          </Form.Group>
        </Form>
      </>
    );
  } else {
    return <h1>loading</h1>;
  }
}

export default AddDepartmentToSchool;
