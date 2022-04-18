const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
}
type Student {
    _id: ID
    name: String
    grade: Number
    note: String
}
type Teacher {
    name: String
    grade: Number
    office: String
}
type School {
    name: String
    principle: String
    class: [ClassRoom]
}`