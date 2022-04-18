const db = require("../config/connection");
const { ClassRoom, User, School, Teacher, Student } = require("../models");
const schoolSeed = require("/schoolSeed.json");
const teacherSeed = require("/teacherSeed.json");
const classRoomSeed = require("/classRoomSeed.json");
const userSeed = require("./userSeeds.json");
const studentSeed = require("./studentSeed.json");

db.once("open", async () => {
  try {
    await ClassRoom.deleteMany({});
    await User.deleteMany({});
    await School.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});

    await User.create(userSeed);
    await ClassRoom.create(classRoomSeed);
    await Teacher.create(teacherSeed);
    await School.create(schoolSeed);
    await Student.create(studentSeed);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("all done!");
  process.exit(0);
});
