import React, { useState } from "react";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import "./Department.css";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_ALLDEPT } from "../../utils/queries";
import { ADD_DEPT_SCHOOL } from "../../utils/mutation";
import Auth from "../../utils/auth";
import { useParams, Link } from "react-router-dom";

function AddDepartmentToSchool() {
	let { id } = useParams();
	const { loading, error, data } = useQuery(QUERY_ALLDEPT);
	const deptResults = data?.departments || [];
	// console.log(deptResults);
	// console.log(data);
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
				<div className="m-3">
					{Auth.loggedIn() ? (
						<>
							<Form.Label>Please Choose A Department to Add</Form.Label>
							<Form className="addDepartmentOption" onSubmit={handleFormSubmit}>
								<DropdownButton
									title="Click to Add a Department"
									className="deptBttn"
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
							</Form>
						</>
					) : (
						<Link to="/">
							You need to be logged in to view this page. Please login.
						</Link>
					)}
				</div>
			</>
		);
	} else {
		return <h1>loading</h1>;
	}
}

export default AddDepartmentToSchool;
