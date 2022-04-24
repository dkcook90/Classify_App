import React, { useState } from "react";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
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
    variables: { schoolId: id, departmentId: departmentState.departmentId },
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

  const handleSelect = (e) => {
    console.log(e);
    setDepartmentState(e);
    console.log(departmentState);
    addDepartment({
      variables: { schoolId: id, departmentId: departmentState.departmentId },
    });
  };

  if (deptResults) {
    return (
      <>
        <Form.Label>Please Choose A Department to Add</Form.Label>
        <Form className="addDepartmentOption" onSubmit={handleFormSubmit}>
          {/* <Form.Group className="m-3" controlId="form">
            <Form.Select
              value={this.departmentState.selectValue}
              onChange={this.handleChange}
            >
              <Form.Control value={departmentState} />
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
                <>loading...</>
              )}
            </Form.Select>

            
          </Form.Group> */}
          <DropdownButton
            alignRight
            title="Click to Add a Department"
            id="dropdown-menu-align-right"
            onSelect={handleSelect}
          >
            {deptResults ? (
              deptResults.map((data) => {
                return (
                  <Dropdown.Item
                    eventKey={data._id}
                    key={data._id}
                    value={data.department}
                  >
                    {data.department}
                  </Dropdown.Item>
                );
              })
            ) : (
              <>loading...</>
            )}
          </DropdownButton>
          {/* <h4>You selected {departmentState}</h4> */}

        </Form>
      </>
    );
  } else {
    return <h1>loading</h1>;
  }
}

export default AddDepartmentToSchool;
