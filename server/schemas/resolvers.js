const { School, Department, Teacher, Student } = require('../models');

const resolvers = {
    Query: {
        schools: async () => {
            return School.find();
        },
        school: async (parent, {schoolId}) => {
            return School.findOne({_id: schoolId});
        },
        departments: async () => {
            return Department.find();
        },
        department: async (parent, {departmentId}) => {
            return Department.findOne({_id: departmentId});
        },
        teachers: async () => {
            return Teacher.find();
        },
        teacher: async (parent, {teacherId}) => {
            return Teacher.findOne({_id: teacherId});
        },
        students: async () => {
            return Student.find();
        },
        student: async (parent, {studentId}) => {
            return Student.findOne({_id: studentId});
        },
    }
}

module.exports = resolvers;