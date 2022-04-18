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
});

const Student = model("Student", studentSchema);
module.exports = Student;
