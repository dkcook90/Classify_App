const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  department: {
    type: String,
    required: true,
  },
  office: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

const Teacher = model("Teacher", teacherSchema, 'Students');
module.exports = Teacher;
