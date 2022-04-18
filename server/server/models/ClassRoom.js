const { Schema, model } = require('mongoose');

const classRoomSchema = new Schema({
    className: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true
    },
    teacherName:{
        type: String,
        required: true
    } 
    
})

const ClassRoom = model('ClassRoom', classRoomSchema)
module.exports = ClassRoom;