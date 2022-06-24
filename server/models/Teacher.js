const { Schema, model } = require("mongoose");

const teacherSchema = new Schema({
	name: {
		type: String,
		// required: true,
	},
	office: {
		type: String,
		required: true,
	},
	departments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Department",
		},
	],
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: "Student",
		},
	],
	classes: [
		{
			type: Schema.Types.ObjectId,
			ref: "ClassRoom",
		},
	],
});

const Teacher = model("Teacher", teacherSchema);
module.exports = Teacher;
