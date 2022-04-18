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
	}

	type Auth {
		token: ID!
		user: User
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
	}
`;

module.exports = typeDefs;
