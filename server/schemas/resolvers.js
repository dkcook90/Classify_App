const { User, School, Department, Teacher, Student } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    schools: async () => {
      return School.find();
    },
    school: async (parent, { schoolId }) => {
      return School.findOne({ _id: schoolId });
    },
    departments: async () => {
      return Department.find();
    },
    department: async (parent, { departmentId }) => {
      return Department.findOne({ _id: departmentId });
    },
    teachers: async () => {
      return Teacher.find();
    },
    teacher: async (parent, { teacherId }) => {
      return Teacher.findOne({ _id: teacherId });
    },
    students: async () => {
      return Student.find();
    },
    student: async (parent, { studentId }) => {
      return Student.findOne({ _id: studentId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addSchool: async (parent, {name, principle}) => {
        return School.create({name, principle});
    },
  },
};

module.exports = resolvers;
