const db = require("../config/connection");
const { Department, User, School, Teacher, Student } = require("../models");
const schoolSeed = require("./schoolSeed.json");
const teacherSeed = require("./teacherSeed.json");
const userSeed = require("./userSeeds.json");
const studentSeed = require("./studentSeed.json");
const departmentSeed = require("./department.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await School.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await Department.deleteMany({});

    const users = await User.insertMany(userSeed);
    const departments = await Department.insertMany(departmentSeed);
    const teachers = await Teacher.insertMany(teacherSeed);
    const schools = await School.insertMany(schoolSeed);
    const students = await Student.insertMany(studentSeed);

    for (newTeacher of teachers) {
      const tempSchool = schools[Math.floor(Math.random() * schools.length)];
      tempSchool.teachers.push(newTeacher);
      await tempSchool.save();
      const tempStudent = students[Math.floor(Math.random() * students.length)];
      console.log("weeeeeeeeeeeeeeeeeeeeeeeee", tempStudent);
      // newTeacher.student.push(tempStudent);
      newTeacher.student = [];
      newTeacher.student.push(tempStudent);
      // console.log("look at me ma", newTeacher.student);
      await newTeacher.save();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("all done!");
  process.exit(0);
});
