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
	mutation addSchool(
		$name: String!
		$principal: String!
		$budget: Int
		$address: String!
		$image: String
	) {
		addSchool(
			name: $name
			principal: $principal
			budget: $budget
			address: $address
			image: $image
		) {
			_id
			name
			principal
			budget
			address
			image
		}
	}
`;

export const UPDATE_SCHOOL = gql`
	mutation updateSchool(
		$schoolId: ID!
		$name: String
		$principal: String
		$budget: Int
		$address: String
		$image: String
	) {
		updateSchool(
			schoolId: $schoolId
			name: $name
			principal: $principal
			budget: $budget
			address: $address
			image: $image
		) {
			_id
			name
			principal
			budget
			address
			image
		}
	}
`;

export const REMOVE_SCHOOL = gql`
	mutation removeSchool($schoolId: ID!) {
		removeSchool(schoolId: $schoolId) {
			_id
			name
			principal
			budget
			address
			image
		}
	}
`;

export const ADD_DEPT = gql`
	mutation addDepartment($department: String!) {
		addDepartment(department: $department) {
			_id
			department
			budget
		}
	}
`;

export const ADD_STUDENT = gql`
	mutation addStudent($name: String!, $grade: Int!, $note: String) {
		addStudent(name: $name, grade: $grade, note: $note) {
			_id
			name
			grade
			note
		}
	}
`;

export const REMOVE_CLASSROOM = gql`
	mutation removeClassroom($classroomId: ID!) {
		removeSchool(classroomId: $classroomId) {
			_id
			className
			grade
		}
	}
`;

export const ADD_STU_SCHOOL = gql`
	mutation addStuToSchool($schoolId: ID!, $studentId: ID!) {
		addStuToSchool(schoolId: $schoolId, studentId: $studentId) {
			_id
			students {
				_id
				name
				grade
				note
			}
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

// export const EDIT_STUDENT = gql`
// 	mutation editStudent($studentId: ID!) {
// 		editStudent(studentId: $studentId) {
// 			_id
// 			name
// 			grade
// 			note
// 		}
// 	}
// `;

export const ADD_DEPT_SCHOOL = gql`
	mutation addDepToSchool($schoolId: String!, $departmentId: String!) {
		addDeptToSchool(schoolId: $schoolId, departmentId: $departmentId) {
			_id
			name
			principal
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

export const ADD_TEACHER = gql`
	mutation addTeacher($name: String!, $office: String!) {
		addTeacher(name: $name, office: $office) {
			_id
			name
			office
		}
	}
`;

export const REMOVE_TEACHER = gql`
	mutation removeTeacher($teacherId: ID!) {
		removeTeacher(teacherId: $teacherId) {
			_id
			name
			office
		}
	}
`;
