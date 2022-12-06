import React from "react";
import { useQuery } from "@apollo/client";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./Student.css";
import { QUERY_SCHOOL, QUERY_ALLSTUDENTS } from "../../utils/queries";
import Auth from "../../utils/auth";
//import { FilteringTable } from '../Table/FilteringTable.js'

function AllStudents() {
	let { id } = useParams();
	const { loading, error, data } = useQuery(QUERY_ALLSTUDENTS);

	const school = data?.school || [];

	const students = data?.school.students || [];
	// console.log(students);

	if (loading) return "Loading...";
	if (error) return `Error! ${error.message}`;

	return (
		<>
			<div className="m-3">
				{Auth.loggedIn() ? (
					<>
						<Container>{/* <FilteringTable /> */}</Container>
					</>
				) : (
					<Link to="/">
						You need to be logged in to view this page. Please login.
					</Link>
				)}
			</div>
		</>
	);
}

export default AllStudents;
