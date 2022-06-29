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
		classes: [ClassRoom]
		teachers: [Teacher]
	}
	type Teacher {
		_id: ID!
		name: String!
		departments: [Department]
		office: String!
		students: [Student]
		classes: [ClassRoom]
	}
	type School {
		_id: ID!
		name: String!
		address: String!
		image: String
		principal: String!
		budget: Int
		departments: [Department]
		teachers: [Teacher]
		students: [Student]
	}
	type Department {
		_id: ID!
		department: String!
		school: School
		budget: Int
		teachers: [Teacher]
		classes: [ClassRoom]
	}
	type ClassRoom {
		_id: ID!
		className: String!
		grade: Int
		teachers: [Teacher]
		departments: [Department]
	}
	type Query {
		schools: [School]!
		school(_id: String!): School
		departments: [Department]!
		department(departmentId: String!): Department
		teachers: [Teacher]!
		teacher(teacherId: String!): Teacher
		students: [Student]!
		student(studentId: String!): Student
		users: [User]
		user(email: String!): User
		classrooms: [ClassRoom]!
		classroom(classroomId: String!): ClassRoom
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
		addTeacher(name: String!, office: String!): Teacher
		addStudent(name: String!, grade: Int!, note: String): Student
		addClassroom(
			className: String!
			grade: Int
			department: ID!
			teacher: ID!
		): ClassRoom

		removeSchool(schoolId: ID!): School
		removeDepartment(departmentId: ID!): Department
		removeTeacher(teacherId: ID!): Teacher
		removeStudent(studentId: ID!): Student
		removeClass(classroomId: ID!): ClassRoom

		updateSchool(
			schoolId: ID!
			name: String
			principal: String
			budget: Int
			address: String
			image: String
		): School
		updateDepartment(
			departmentId: ID!
			department: String!
			school: ID!
			budget: Int
		): Department
		updateTeacher(teacherId: ID!, name: String, office: String): Teacher
		updateStudent(
			studentId: ID!
			name: String
			grade: String
			note: String
		): Student
		updateClassroom(
			classroomId: ID!
			className: String
			grade: String
			department: ID!
			teacher: ID!
		): ClassRoom

		# school specific
		addDepToSchool(schoolId: ID!, departmentId: ID): School
		rmvDepFrmSchool(schoolId: ID!, departmentId: ID): School
		addTeachToSchool(schoolId: ID!, teacherId: ID): School
		rmvTeachFrmSchool(schoolId: ID!, teacherId: ID): School
		addStuToSchool(schoolId: ID!, studentId: ID): School
		rmvStuFrmSchool(schoolId: ID!, studentId: ID): School
		# addNTEToSchool(schoolId: ID!, nteId: ID): School
		# rmvNTEToSchool(schoolId: ID!, nteId: ID): School

		# department specific
		addTeachToDep(schoolId: ID!, teacherId: ID): Department
		rmvTeachFrmDep(schoolId: ID!, teacherId: ID): Department
		addClassToDep(schoolId: ID!, classroomId: ID): Department
		rmvClassFrmDep(schoolId: ID!, classroomId: ID): Department

		# teacher specific
		addStuToTeacher(teacherId: ID!, studentId: ID): Teacher
		rmvStuFrmTeacher(teacherId: ID!, studentId: ID): Teacher
		addClassToTeacher(teacherId: ID!, classroomId: ID): Teacher
		rmvClassFrmTeacher(teacherId: ID!, classroomId: ID): Teacher
		addDepToTeacher(teacherId: ID!, departmentId: ID): Teacher
		rmvDepFrmTeacher(teacherId: ID!, departmentId: ID): Teacher

		# ClassRoom specific
		# addTeacherToClass(classroomId: ID, teacherId: ID!): ClassRoom
		# rmvTeacherFrmClass(classroomId: ID, teacherId: ID!): ClassRoom
		addStuToClass(classroomId: ID!, studentId: ID): ClassRoom
		rmvStuFrmClass(classroomId: ID!, studentId: ID): ClassRoom

		# student specific
		addTeachToStudent(studentId: ID!, teacherId: ID): Student
		rmvTeachFrmStudent(studentId: ID!, teacherId: ID): Student
		addClassToStudent(studentId: ID!, classroomId: ID): Student
		rmvClassFrmStudent(studentId: ID!, classroomId: ID): Student
	}
`;

module.exports = typeDefs;
