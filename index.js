const Teacher = require('./server/models/Teacher.js')
 
 async function updateTeacher({teacherId, name, department, office, studentId}) {
    const teacherData = await Teacher.findOneAndUpdate(
      {_id: teacherId},
      {name: name, department: department, office: office, $push: {students: studentId}},
      {new: true}
    );
    return teacherData
  }

const teacher = updateTeacher( {teacherId: "625f10528801803c5e236fc6", studentId: "625f10528801803c5e236fd0"}).then( res => console.log(res)).catch(err => console.log(err))
console.log(teacher)