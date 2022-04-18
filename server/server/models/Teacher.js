const { Schema, model } = require('mongoose');

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true
    },
    office:{
        type: String,
        required: true
    } 
})

const Teacher = model('Teacher', teacherSchema)
module.exports = Teacher;