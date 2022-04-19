import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

// export const REMOVE_USER = gql`
// 	mutation removeUser($email: String!) {
// 		removeUser(email: $email) {
// 		}
// 	}
// `;

export const ADD_SCHOOL = gql`
	mutation addSchool($name: String!) {
		addSchool(name: $name) {
			_id
			name
			principle
			budget
			department
			teachers
		}
	}
`;

export const UPDATE_SCHOOL = gql`
	mutation updateSchool($name: String!) {
		updateSchool(name: $name) {
			_id
			name
			principle
			budget
			department
			teachers
		}
	}
`;

export const REMOVE_SCHOOL = gql`
	mutation removeSchool($name: String!) {
		removeSchool(name: $name) {
			_id
			name
			principle
			budget
			department
			teachers
		}
	}
`;
