// require in seed jsons and DB models
const db = require("../config/connection");
const {
	Department,
	User,
	School,
	Teacher,
	Student,
	ClassRoom,
} = require("../models");

const schoolSeed = require("./schoolSeed.json");
const teacherSeed = require("./teacherSeed.json");
const userSeed = require("./userSeeds.json");
const studentSeed = require("./studentSeed.json");
const departmentSeed = require("./departments.json");
const classroomsSeed = require("./classrooms.json");

db.once("open", async () => {
	try {
		// removes old DB seeds and edits
		await User.deleteMany({});
		await School.deleteMany({});
		await Teacher.deleteMany({});
		await Student.deleteMany({});
		await Department.deleteMany({});
		await ClassRoom.deleteMany({});

		//  assembles arrays of the seeds to add to the upper level of models
		// const tIdArr = [];
		// const sIdArr = [];
		// const dIdArr = [];
		// const cIdArr = [];

		// takes the seed data and adds it to the DB collection
		await User.insertMany(userSeed);
		const students = await Student.insertMany(studentSeed);
		const classrooms = await ClassRoom.insertMany(classroomsSeed);
		const departments = await Department.insertMany(departmentSeed);
		const teachers = await Teacher.insertMany(teacherSeed);
		await School.insertMany(schoolSeed);

		// adds the seed data to the arrays created earlier
		// for (let i = 0; i < departments.length; i++) {
		// 	dIdArr.push(departments[i]._id);
		// }
		// for (let i = 0; i < teachers.length; i++) {
		// 	tIdArr.push(teachers[i]._id);
		// }
		// for (let i = 0; i < students.length; i++) {
		// 	sIdArr.push(students[i]._id);
		// }
		// for (let i = 0; i < classrooms.length; i++) {
		// 	cIdArr.push(classrooms[i]._id);
		// }

		// uses the assembled arrays to add them to the hiugher level models, needs to be redone so all data isn't pushed to every collection instance.
		// await Teacher.updateMany(
		// 	{},
		// 	{ $push: { students: sIdArr } },
		// 	{ new: true }
		// );
		// await School.updateMany(
		// 	{},
		// 	{ $push: { classrooms: cIdArr } },
		// 	{ new: true }
		// );
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("all done!");
	process.exit(0);
});
