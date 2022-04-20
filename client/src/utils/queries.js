import { gql } from "@apollo/client";

export const QUERY_USER = gql`
	query user($_id: Number!) {
		user(_id: $_id) {
			_id
			username
			email
			role
		}
	}
`;

export const QUERY_SCHOOL = gql`
	query school($name: String!) {
		school(name: $name) {
			_id
			name
			principle
			budget
			department
			teachers
		}
	}
`;

export const QUERY_ALLSCHOOLS = gql`
	query getSchools {
		schools {
			_id
			name
			principle
			budget
			department
			teachers
		}
	}
`;
