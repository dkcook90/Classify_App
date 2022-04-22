import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavbarComp from "./componets/Navbar/Navbar";
import Footer from "./componets/Footer/Footer";

import Home from "./componets/Home/Home";
import Login from "./componets/Login/Login";
import School from "./componets/School/School";
import Department from "./componets/Department/Department";
import Classroom from "./componets/Classroom/Classroom";
import AllDepartments from './componets/Department/AllDepartments.js'
import AllClassrooms from './componets/Classroom/AllClassrooms.js'

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
        <div className="d-flex flex-column justify-flex-start min-100-vh">
          <NavbarComp />
          <div className="container">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/schools" element={<School />} />
              <Route path="/departments/:id" element={<Department />} />
              <Route path="/classroom/:teacherId" element={<Classroom />} />
              <Route path="/classroom" element={<AllClassrooms />} />
              <Route path="/departments" element={<AllDepartments />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
