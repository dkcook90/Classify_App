const { Schema, model } = require("mongoose");

const departmentSchema = new Schema({
	department: {
		type: String,
		required: true,
	},
	school: {
		type: Schema.Types.ObjectId,
		ref: "School",
	},
	budget: {
		type: Number,
	},
	classes: [
		{
			type: Schema.Types.ObjectId,
			ref: "ClassRoom",
		},
	],
	teachers: [
		{
			type: Schema.Types.ObjectId,
			ref: "Teacher",
		},
	],
});

const Department = model("Department", departmentSchema);
module.exports = Department;
