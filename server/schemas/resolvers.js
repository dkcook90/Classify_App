const {
	User,
	School,
	Department,
	Teacher,
	Student,
	ClassRoom,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		schools: async () => {
			return await School.find()
				.populate("departments")
				.populate("teachers")
				.populate("students")
				.populate({ path: "teachers", populate: "students" });
		},
		school: async (parent, { _id }) => {
			return await School.findOne({ _id: _id })
				.populate("departments")
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
		classrooms: async () => {
			return await ClassRoom.find();
		},
		classroom: async (parent, { classroomId }) => {
			return await ClassRoom.findOne({ _id: classroomId });
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
		addDepartment: async (parent, { department, school, budget }) => {
			return await Department.create({
				department,
				school,
				budget,
			});
		},
		addTeacher: async (parent, { name, department, office }) => {
			return await Teacher.create({ name, department, office });
		},
		addStudent: async (parent, { name, grade, note }) => {
			return await Student.create({ name, grade, note });
		},
		addClassroom: async (parent, { className, grade, teacher, department }) => {
			return await ClassRoom.create({ className, grade, teacher, department });
		},

		updateSchool: async (
			parent,
			{ schoolId, name, budget, principal, image, address }
		) => {
			const schoolData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{
					name: name,
					principal: principal,
					budget: budget,
					image: image,
					address: address,
					$push: { department: Department },
				},
				{ new: true }
			);
			return schoolData;
		},
		updateDepartment: async (
			parent,
			{ departmentId, department, schoolId, budget }
		) => {
			const departmentData = await Department.findOneAndUpdate(
				{ _id: departmentId },
				{
					department: department,
					school: schoolId,
					budget: budget,
				},
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
		updateClassroom: async (
			parent,
			{ classroomId, className, grade, teacherId, departmentId }
		) => {
			const classroomData = await ClassRoom.findOneAndUpdate(
				{ _id: classroomId },
				{
					className: className,
					grade: grade,
					teacher: teacherId,
					department: departmentId,
				},
				{ new: true }
			);
			return classroomData;
		},

		addDepToSchool: async (parent, { schoolId, departmentId }) => {
			const schData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $push: { department: departmentId } },
				{ new: true }
			);
			return schData;
		},
		rmvDepFrmSchool: async (parent, { schoolId, departmentId }) => {
			const schData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $pull: { department: departmentId } }
			);
			return schData;
		},
		addTeachToSchool: async (parent, { schoolId, teacherId }) => {
			const schData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $push: { teachers: teacherId } },
				{ new: true }
			);
			return schData;
		},
		rmvTeachFrmSchool: async (parent, { schoolId, teacherId }) => {
			const schData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $pull: { teachers: teacherId } }
			);
			return schData;
		},
		addStuToSchool: async (parent, { schoolId, studentId }) => {
			const schData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $push: { student: studentId } },
				{ new: true }
			);
			return schData;
		},
		rmvStuFrmSchool: async (parent, { schoolId, studentId }) => {
			const schData = await School.findOneAndUpdate(
				{ _id: schoolId },
				{ $pull: { students: studentId } }
			);
			return schData;
		},

		addTeachToDep: async (parent, { departmentId, teacherId }) => {
			const teachData = await School.findOneAndUpdate(
				{ _id: departmentId },
				{ $push: { teachers: teacherId } },
				{ new: true }
			);
			return teachData;
		},
		rmvTeachFrmDep: async (parent, { departmentId, teacherId }) => {
			const teachData = await School.findOneAndUpdate(
				{ _id: departmentId },
				{ $pull: { teachers: teacherId } }
			);
			return teachData;
		},
		addClassToDep: async (parent, { departmentId, classroomId }) => {
			const teachData = await School.findOneAndUpdate(
				{ _id: departmentId },
				{ $push: { classes: classroomId } },
				{ new: true }
			);
			return teachData;
		},
		rmvClassFrmDep: async (parent, { departmentId, classroomId }) => {
			const teachData = await School.findOneAndUpdate(
				{ _id: departmentId },
				{ $pull: { classes: classroomId } }
			);
			return teachData;
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
		addClassToTeacher: async (parent, { teacherId, classroomId }) => {
			const teachData = await Teacher.findOneAndUpdate(
				{ _id: teacherId },
				{ $push: { classes: classroomId } },
				{ new: true }
			);
			return teachData;
		},
		rmvClassFrmTeacher: async (parent, { teacherId, classroomId }) => {
			const teachData = await Teacher.findOneAndUpdate(
				{ _id: teacherId },
				{ $pull: { classes: classroomId } }
			);
			return teachData;
		},
		addDepToTeacher: async (parent, { teacherId, departmentId }) => {
			const teachData = await Teacher.findOneAndUpdate(
				{ _id: teacherId },
				{ $push: { departments: departmentId } },
				{ new: true }
			);
			return teachData;
		},
		rmvDepFrmTeacher: async (parent, { teacherId, departmentId }) => {
			const teachData = await Teacher.findOneAndUpdate(
				{ _id: teacherId },
				{ $pull: { departments: departmentId } }
			);
			return teachData;
		},

		addStuToClass: async (parent, { classroomId, studentId }) => {
			const classData = await ClassRoom.findOneAndUpdate(
				{ _id: classroomId },
				{ $push: { students: studentId } },
				{ new: true }
			);
			return classData;
		},
		rmvStuFrmClass: async (parent, { classroomId, studentId }) => {
			const classData = await ClassRoom.findOneAndUpdate(
				{ _id: classroomId },
				{ $pull: { students: studentId } }
			);
			return classData;
		},

		addTeachToStudent: async (parent, { studentId, teacherId }) => {
			const stuData = await Student.findOneAndUpdate(
				{ _id: studentId },
				{ $push: { teachers: teacherId } },
				{ new: true }
			);
			return stuData;
		},
		rmvTeachFrmStudent: async (parent, { studentId, teacherId }) => {
			const stuData = await Student.findOneAndUpdate(
				{ _id: studentId },
				{ $pull: { teachers: teacherId } }
			);
			return stuData;
		},
		addClassToStudent: async (parent, { studentId, classroomId }) => {
			const stuData = await Student.findOneAndUpdate(
				{ _id: studentId },
				{ $push: { classes: classroomId } },
				{ new: true }
			);
			return stuData;
		},
		rmvClassFrmStudent: async (parent, { studentId, classroomId }) => {
			const stuData = await Student.findOneAndUpdate(
				{ _id: studentId },
				{ $pull: { classes: classroomId } }
			);
			return stuData;
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
		removeClass: async (parent, { classroomId }) => {
			return await ClassRoom.findOneAndDelete({ _id: classroomId });
		},
	},
};

module.exports = resolvers;
