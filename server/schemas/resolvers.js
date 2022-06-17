const { User, School, Department, Teacher, Student } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		schools: async () => {
			return await School.find()
				.populate("department")
				.populate("teachers")
				.populate("students")
				.populate({ path: "teachers", populate: "students" });
		},
		school: async (parent, { _id }) => {
			return await School.findOne({ _id: _id })
				.populate("department")
				.populate("teachers")
				.populate("students")
				.populate({ path: "teachers", populate: "students" });
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
			return await Student.find().populate("teachers");
		},
		student: async (parent, { studentId }) => {
			return await Student.findOne({ _id: studentId }).populate("teachers");
		},
		users: async () => {
			return await User.find();
		},
		user: async (parent, { email }) => {
			return User.findOne({ email });
		},
	},

	Mutation: {
		addUser: async (parent, { username, email, password, role }) => {
			const user = await User.create({ username, email, password, role });
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

		addSchool: async (parent, { name, principal, budget, image, address }) => {
			return await School.create({ name, principal, budget, image, address });
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

		updateSchool: async (
			parent,
			{ schoolId, name, budget, principal, department }
		) => {
			const schoolData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{
					name: name,
					principal: principal,
					budget: budget,
					image: image,
					address: address,
					$push: { department: department },
				},
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
		updateTeacher: async (parent, { teacherId, name, department, office }) => {
			const teacherData = await Teacher.findOneAndUpdate(
				{ _id: teacherId },
				{ name: name, department: department, office: office },
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

		addDepToSchool: async (parent, { schoolId, departmentId }) => {
			const depData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $push: { department: departmentId } },
				{ new: true }
			);
			return depData;
		},
		rmvDepFrmSchool: async (parent, { schoolId, departmentId }) => {
			const depData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $pull: { department: departmentId } }
			);
			return depData;
		},
		addTeachToSchool: async (parent, { schoolId, teacherId }) => {
			const teachData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $push: { teachers: teacherId } },
				{ new: true }
			);
			return teachData;
		},
		rmvTeachFrmSchool: async (parent, { schoolId, teacherId }) => {
			const teachData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $pull: { teachers: teacherId } }
			);
			return teachData;
		},
		addStuToSchool: async (parent, { schoolId, studentId }) => {
			const teachData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $push: { student: studentId } },
				{ new: true }
			);
			return stuData;
		},
		rmvStuFrmSchool: async (parent, { schoolId, studentId }) => {
			const teachData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $pull: { students: studentId } }
			);
			return stuData;
		},

		addStuToTeacher: async (parent, { teacherId, studentId }) => {
			const teachData = await Teacher.findOneAndUpdate(
				{ _id: teacherId },
				{ $push: { students: studentId } },
				{ new: true }
			);
			return teachData;
		},
		rmvStuFrmTeacher: async (parent, { teacherId, studentId }) => {
			const teachData = await Teacher.findOneAndUpdate(
				{ _id: teacherId },
				{ $pull: { students: studentId } }
			);
			return teachData;
		},
		addTeachToStudent: async (parent, { studentId, teacherId }) => {
			const teachData = await Student.findOneAndUpdate(
				{ _id: studentId },
				{ $push: { teachers: teacherId } },
				{ new: true }
			);
			return teachData;
		},
		rmvTeachFrmStudent: async (parent, { studentId, teacherId }) => {
			const teachData = await Student.findOneAndUpdate(
				{ _id: studentId },
				{ $pull: { teachers: teacherId } }
			);
			return teachData;
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
