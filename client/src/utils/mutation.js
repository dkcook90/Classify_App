import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
				email
				role
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
				email
				role
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
	mutation addSchool($name: String!, $principle: String!, $budget: Int!) {
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
	mutation removeSchool($schoolId: ID!) {
		removeSchool(schoolId: $schoolId) {
			_id
			name
			principle
			budget
		}
	}
`;

export const REMOVE_STUDENT = gql`
	mutation removeStudent($studentId: ID!) {
		removeStudent(studentId: $studentId) {
			_id
			name
			grade
			note
		}
	}
`;

export const ADD_DEPT_SCHOOL = gql`
	mutation addDepToSchool($schoolId: String!, $departmentId: String!) {
		addDeptToSchool(schoolId: $schoolId, departmentId: $departmentId) {
			_id
			name
			principle
			budget
			department {
				_id
				department
				budget
			}
			teachers {
				_id
				name
				department
				office
				students {
					_id
					name
					grade
					note
				}
			}
		}
	}
`;
