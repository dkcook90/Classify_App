const { Schema, model } = require("mongoose");

const schoolSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 40,
    trim: true,
  },
  principle: {
    type: String,
    required: true,
  },
  budget: {
      type: Number
  },
  department: [
    {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
  ],
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
});
const School = model("School", schoolSchema);
module.exports = School;
