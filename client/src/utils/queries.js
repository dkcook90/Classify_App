import { gql } from "@apollo/client";

export const QUERY_USER = gql`
	query User($_id: String!) {
		user(_id: $_id) {
			_id
			username
			email
			role
		}
	}
`;

export const QUERY_ALLSCHOOLS = gql`
	query getSchools {
		schools {
			_id
			name
			principal
			budget
			address
			image
			departments {
				_id
				department
				budget
			}
			teachers {
				_id
				name
				office
			}
			students {
				_id
				name
				grade
				note
			}
		}
	}
`;

export const QUERY_SCHOOL = gql`
	query school($_id: String!) {
		school(_id: $_id) {
			_id
			name
			principal
			budget
			address
			image
			departments {
				_id
				department
				budget
			}
			teachers {
				_id
				name
				office
			}
			students {
				_id
				name
				grade
				note
			}
		}
	}
`;

export const QUERY_ALLDEPT = gql`
	query getDepartments {
		departments {
			_id
			department
			budget
			school {
				_id
				name
				principal
				budget
				address
				image
			}
			classes {
				_id
				className
				grade
			}
			teachers {
				_id
				name
				office
			}
		}
	}
`;

export const QUERY_DEPT = gql`
	query department($_id: String!) {
		department(_id: $_id) {
			_id
			department
			budget
			school {
				_id
				name
				principal
				budget
				address
				image
			}
			classes {
				_id
				className
				grade
			}
			teachers {
				_id
				name
				office
			}
		}
	}
`;

export const QUERY_ALLCLASSROOMS = gql`
	query getAllClassrooms {
		classrooms {
			_id
			className
			grade
			departments {
				_id
				department
				budget
			}
			teachers {
				_id
				name
				office
			}
		}
	}
`;

export const QUERY_CLASSROOM = gql`
	query getClassroom($_id: ID!) {
		classroom(_id: $_id) {
			_id
			name
			grade
			department {
				_id
				department
				budget
				school
			}
			teacher {
				_id
				name
				office
			}
		}
	}
`;

export const QUERY_ALLTEACHERS = gql`
	query getTeachers {
		teachers {
			_id
			name
			office
			departments {
				_id
				department
				budget
			}
			students {
				_id
				name
				grade
				note
			}
			classes {
				_id
				className
				grade
			}
		}
	}
`;

export const QUERY_SINGLE_TEACHER = gql`
	query getSingleTeacher($teacherId: String!) {
		teacher(teacherId: $teacherId) {
			_id
			name
			office
			departments {
				_id
				department
				budget
			}
			students {
				_id
				name
				grade
				note
			}
			classes {
				_id
				className
				grade
			}
		}
	}
`;

export const QUERY_ALLSTUDENTS = gql`
	query getStudents {
		students {
			_id
			name
			grade
			note
			classes {
				_id
				className
				grade
			}
			teachers {
				_id
				name
				office
			}
		}
	}
`;

export const QUERY_SINGLE_STUDENT = gql`
	query getSingleStudent($_id: ID!) {
		student(_id: $_id) {
			_id
			name
			grade
			note
			classes {
				_id
				className
				grade
			}
			teachers {
				_id
				name
				office
			}
		}
	}
`;
