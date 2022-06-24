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
			ref: "Teacher",
		},
	],

	classes: [
		{
			type: Schema.Types.ObjectId,
			ref: "ClassRoom",
		},
	],
});

const Student = model("Student", studentSchema);
module.exports = Student;
