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
    const tIdArr = [];
    const sIdArr = [];
    const dIdArr = [];
    await User.insertMany(userSeed);
    const students = await Student.insertMany(studentSeed);
    const departments = await Department.insertMany(departmentSeed);
    const teachers = await Teacher.insertMany(teacherSeed);
    await School.insertMany(schoolSeed);
    for (let i = 0; i < departments.length; i++) {
      dIdArr.push(departments[i]._id);
    }
    for (let i = 0; i < teachers.length; i++) {
      tIdArr.push(teachers[i]._id);
    }
    for (let i = 0; i < students.length; i++) {
      sIdArr.push(students[i]._id);
    }
    await Teacher.updateMany(
      {},
      { $push: { students: sIdArr } },
      { new: true }
    );
    await School.updateMany(
      {},
      { $push: { department: dIdArr, teachers: tIdArr } },
      { new: true }
    );
    // const randomTeacher = (teachers) => {
    //   const tempSchool = schools[Math.floor(Math.random() * schools.length)];
    //   console.log("weeeee", tempSchool);
    //   console.log("look at all these teachers!", teachers);
    //   console.log(teachers[0]._id);
    //   tempSchool.teachers.push(teachers[0]._id);
    //   // tempSchool.departments.push(department.id);
    //   console.log("after the push", tempSchool);
    //   tempSchool.save();
    // };
    // console.log(randomTeacher(teachers));

    // for (newTeacher of teachers) {
    //   const tempSchool = schools[Math.floor(Math.random() * schools.length)];
    //   tempSchool.teachers.push(newTeacher.id);
    //   tempSchool.departments.push(department.id);
    //   console.log(tempSchool);
    //   // await tempSchool.save();

    //   // const tempStudent = students[Math.floor(Math.random() * students.length)];
    //   // console.log("weeeeeeeeeeeeeeeeeeeeeeeee", tempStudent);
    //   // // newTeacher.student.push(tempStudent);
    //   // newTeacher.student = [];
    //   // newTeacher.student.push(tempStudent);
    //   // // console.log("look at me ma", newTeacher.student);
    //   // await newTeacher.save();
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("all done!");
  process.exit(0);
});
