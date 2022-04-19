const { gql } = require('apollo-server-express');

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
    name: String!
    grade: Int!
    note: String
    
}
type Teacher {
    _id: ID!
    name: String!
    department: String!
    office: String!
    students: [Student]
}
type School {
    _id: ID!
    name: String!
    principle: String!
    department:[Department]
    teachers: [Teacher]
}
type Department {
    _id: ID!
    department: String!
}
type Query {
    schools: [School]!
	school(schoolId: ID!): School
    departments: [Department]!
	department(departmentId: ID!): Department
    teachers: [Teacher]!
	teacher(teacherId: ID!): Teacher
    students: [Student]!
	student(studentId: ID!): Student
}
`;

module.exports = typeDefs;