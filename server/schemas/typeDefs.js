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
    department: [Department]
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
  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addSchool(name: String!, principle: String!): School
    addDepartment(department: String!): Department
    addTeacher(name: String!, department: String!, office: String!): Teacher
    addStudent(name: String!, grade: Int!, note: String): Student

    removeSchool(schoolId: ID!): School
    removeDepartment(departmentId: ID!): Department
    removeTeacher(teacherId: ID!): Teacher
    removeStudent(studentId: ID!): Student

    updateSchool(schoolId: ID!, name: String, principle: String): School
    updateDepartment(departmentId: ID!, department: String): Department
    updateTeacher(teacherId: ID!, name: String, department: String, office: String): Teacher
    updateStudent(stundentId: ID!, name: String, grade: String, note: String): Student
  }
`;

module.exports = typeDefs;
