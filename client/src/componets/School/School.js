import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Auth } from "../../utils/auth";
import { QUERY_SCHOOL } from "../../utils/queries";
import { ADD_SCHOOL, UPDATE_SCHOOL, REMOVE_SCHOOL } from "../../utils/mutation";

function Schools() {
	return (
		<>
			<div className="schoolInfoContainer"></div>
		</>
	);
}
export default Schools;
