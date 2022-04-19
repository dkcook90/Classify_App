import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Auth } from "../../utils/auth";
import { QUERY_SCHOOL } from "../../utils/queries";
import { ADD_SCHOOL, UPDATE_SCHOOL, REMOVE_SCHOOL } from "../../utils/mutation";

function Schools() {
	return (
		<>
			<div className="schoolInfoContainer">
				<div id="schooloptions">
					{params.Schools.map((school) => (
						<option key={school} value={school}>
							{school}
						</option>
					))}
				</div>
			</div>
		</>
	);
}
export default Schools;
