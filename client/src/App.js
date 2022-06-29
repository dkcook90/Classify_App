import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarComp from "./componets/Navbar/Navbar";
import Footer from "./componets/Footer/Footer";

import Home from "./componets/Home/Home";
import Login from "./componets/Login/Login";
import School from "./componets/School/School";
import EditSchool from "./componets/School/EditSchool";
import Department from "./componets/Department/Department";
import AllDepartments from "./componets/Department/AllDepartments.js";
import Classroom from "./componets/Classroom/Classroom";
import AllClassrooms from "./componets/Classroom/AllClassrooms.js";
import Teachers from "./componets/Teacher/AllTeachers";
import SchoolTeachers from "./componets/Teacher/SchoolTeachers";
import TeacherTable from "./componets/Teacher/TeacherTable";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem("id_token");
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className="content-container d-flex flex-column justify-flex-start">
					<NavbarComp />
					<div className="container mb-5">
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/home" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/schools" element={<School />} />
							<Route path="/schools/:schoolId" element={<EditSchool />} />
							<Route path="/teachers" element={<Teachers />} />
							<Route path="/teacherstable" element={<TeacherTable />} />
							<Route path="/teachers/:id" element={<SchoolTeachers />} />
							<Route path="/departments/:id" element={<Department />} />
							<Route path="/classroom/:teacherId" element={<Classroom />} />
							<Route path="/classroom" element={<AllClassrooms />} />
							<Route path="/departments" element={<AllDepartments />} />
						</Routes>
					</div>
				</div>
				<div className="footer">
					<Footer />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
