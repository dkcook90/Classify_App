import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Auth } from "../../utils/auth";
import { QUERY_SCHOOL } from "../../utils/queries";
import { ADD_SCHOOL, UPDATE_SCHOOL, REMOVE_SCHOOL } from "../../utils/mutation";
import { Button } from "react-bootstrap";

function Schools() {
	return (
		<>
			<section className="schoolsContainer">
				{console.log(state)}
				{state.Schools.map((school) => (
					<div key={school.id} id={school.id} className="card mb-3">
						<h4 className="card-header bg-primary text-light p-2 m-0">
							{school.name}
						</h4>
						<div className="card-body bg-light p-2">
							<p>{school.principle}</p>
							<code>
								Assigned Budget:
								{school.budget}
							</code>
							<code>
								Departments:
								{school.department}
							</code>
							<code>
								Teachers:
								{school.teachers}
							</code>
						</div>
						<span style={{ fontSize: "1rem" }}></span>
					</div>
				))}
			</section>
		</>
	);
}
export default Schools;
