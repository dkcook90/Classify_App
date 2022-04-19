const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Teacher'
    }
  ]

});

const Student = model("Student", studentSchema, 'Teachers');
module.exports = Student;
