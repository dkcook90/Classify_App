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

    await User.create(userSeed);
    await Teacher.create(teacherSeed);
    await School.create(schoolSeed);
    await Student.create(studentSeed);
    await Department.create(departmentSeed);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("all done!");
  process.exit(0);
});
