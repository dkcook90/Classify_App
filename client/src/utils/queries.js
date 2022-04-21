import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query User($_id: Number!) {
    user(_id: $_id) {
      _id
      username
      email
      role
    }
  }
`;

export const QUERY_SCHOOL = gql`
  query school($name: String!) {
    school(name: $name) {
      _id
      name
      principle
      budget
      department
      teachers
    }
  }
`;

export const QUERY_ALLSCHOOLS = gql`
  query getSchools {
    schools {
      _id
      name
      principle
      budget
    }
  }
`;
export const QUERY_ALLTEACHERS = gql`
  query getTeachers {
    teachers {
      _id
      name
      department
      office
    }
  }
`;
export const QUERY_TEACHER = gql`
  query teacher($name: String!) {
    teacher(name: $name) {
      _id
      name
      department
      office
      students
    }
  }
`;
export const QUERY_ALLDEPT = gql`
  query getDepartments {
    departments {
      _id
      department
    }
  }
`;
export const QUERY_DEPT = gql`
  query department($name: String!) {
    department(name: $name) {
      _id
      department
    }
  }
`;
