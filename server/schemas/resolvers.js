const { User, School, Department, Teacher, Student } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    schools: async () => {
      return await School.find();
    },
    school: async (parent, { schoolId }) => {
      return await School.findOne({ _id: schoolId });
    },
    departments: async () => {
      return await Department.find();
    },
    department: async (parent, { departmentId }) => {
      return await Department.findOne({ _id: departmentId });
    },
    teachers: async () => {
      return await Teacher.find().populate("students");
    },
    teacher: async (parent, { teacherId }) => {
      return await Teacher.findOne({ _id: teacherId }).populate("students");
    },
    students: async () => {
      return await Student.find();
    },
    student: async (parent, { studentId }) => {
      return await Student.findOne({ _id: studentId });
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

    addSchool: async (parent, { name, principle }) => {
      return await School.create({ name, principle });
    },
    addDepartment: async (parent, { department }) => {
      return await Department.create({ department });
    },
    addTeacher: async (parent, { name, department, office }) => {
      return await Teacher.create({ name, department, office });
    },
    addStudent: async (parent, { name, grade, note }) => {
      return await Student.create({ name, grade, note });
    },

    updateSchool: async (parent, { schoolId, name, principle }) => {
      const schoolData = await School.findOneAndUpdate(
        { _id: schoolId },
        { name: name, principle: principle },
        { new: true }
      );
      return schoolData;
    },
    updateDepartment: async (parent, { departmentId, department }) => {
      const departmentData = await Department.findOneAndUpdate(
        { _id: departmentId },
        { department: department },
        { new: true }
      );
      return departmentData;
    },
    updateTeacher: async (
      parent,
      { teacherId, name, department, office, students }
    ) => {
      const teacherData = await Teacher.findOneAndUpdate(
        { _id: teacherId },
        {
          name: name,
          department: department,
          office: office,
          $push: { students: students },
        },
        { new: true }
      );
      return teacherData;
    },
    updateStudent: async (parent, { studentId, name, grade, note }) => {
      const studentData = await Student.findOneAndUpdate(
        { _id: studentId },
        { name: name, grade: grade, note: note },
        { new: true }
      );
      return studentData;
    },

    removeSchool: async (parent, { schoolId }) => {
      return await School.findOneAndDelete({ _id: schoolId });
    },
    removeDepartment: async (parent, { departmentId }) => {
      return await Department.findOneAndDelete({ _id: departmentId });
    },
    removeTeacher: async (parent, { teacherId }) => {
      return await Teacher.findOneAndDelete({ _id: teacherId });
    },
    removeStudent: async (parent, { studentId }) => {
      return await Student.findOneAndDelete({ _id: studentId });
    },
  },
};

module.exports = resolvers;
