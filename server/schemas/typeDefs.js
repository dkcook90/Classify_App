const { gql } = require("apollo-server-express");

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		password: String!
		role: String!
	}
	type Student {
		_id: ID!
		name: String
		grade: Int
		note: String
	}
	type Teacher {
		_id: ID!
		name: String!
		department: [Department]
		office: String!
		students: [Student]
	}
	type School {
		_id: ID!
		name: String!
		address: String!
		image: String
		principal: String!
		budget: Int
		department: [Department]
		teachers: [Teacher]
		students: [Student]
	}
	type Department {
		_id: ID!
		department: String!
		school: String
		budget: Int
		teachers: [Teacher]
		classrooms: [ClassRoom]
	}
	type ClassRoom {
		_id: ID!
		className: String!
		grade: Int
		teacher: [Teacher]
		department: Department
	}
	type Query {
		schools: [School]!
		school(_id: String!): School
		departments: [Department]!
		department(departmentId: ID!): Department
		teachers: [Teacher]!
		teacher(teacherId: ID!): Teacher
		students: [Student]!
		student(studentId: ID!): Student
		users: [User]
		user(email: String!): User
	}
	type Auth {
		token: ID!
		user: User
	}

	type Mutation {
		addUser(
			username: String!
			email: String!
			password: String!
			role: String!
		): Auth

		login(email: String!, password: String!): Auth

		addSchool(
			name: String!
			principal: String!
			budget: Int
			address: String!
			image: String
		): School

		addDepartment(department: String!, school: String, budget: Int): Department

		addTeacher(name: String!, department: String!, office: String!): Teacher

		addStudent(name: String!, grade: Int!, note: String): Student

		removeSchool(schoolId: ID!): School
		removeDepartment(departmentId: ID!): Department
		removeTeacher(teacherId: ID!): Teacher
		removeStudent(studentId: ID!): Student

		updateSchool(
			schoolId: ID!
			name: String
			principal: String
			budget: Int
			department: String
			address: String
			image: String
		): School
		updateDepartment(
			departmentId: ID!
			department: String!
			budget: Int
		): Department
		updateTeacher(
			teacherId: ID!
			name: String
			department: String
			office: String
		): Teacher
		updateStudent(
			studentId: ID!
			name: String
			grade: String
			note: String
		): Student

		addDepToSchool(schoolId: ID!, departmentId: ID): School
		rmvDepFrmSchool(schoolId: ID!, departmentId: ID): School
		addTeachToSchool(schoolId: ID!, teacherId: ID): School
		rmvTeachFrmSchool(schoolId: ID!, teacherId: ID): School
		addStuToSchool(schoolId: ID!, studentId: ID): School
		rmvStuFrmSchool(schoolId: ID!, studentId: ID): School
		# addNTEToSchool(schoolId: ID!, nteId: ID): School
		# rmvNTEToSchool(schoolId: ID!, nteId: ID): School

		addTeachToDep(schoolId: ID!, teacherId: ID): Department
		rmvTeachFrmDep(schoolId: ID!, teacherId: ID): Department
		addClassToDep(schoolId: ID!, classroomId: ID): Department
		rmvClassFrmDep(schoolId: ID!, classroomId: ID): Department

		addStuToTeacher(teacherId: ID!, studentId: ID): Teacher
		rmvStuFrmTeacher(teacherId: ID!, studentId: ID): Teacher
		addTeachToStudent(studentId: ID!, teacherId: ID): Student
		rmvTeachFrmStudent(studentId: ID!, teacherId: ID): Student
	}
`;

module.exports = typeDefs;
