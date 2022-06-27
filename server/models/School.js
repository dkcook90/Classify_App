const { Schema, model } = require("mongoose");

const schoolSchema = new Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 40,
		trim: true,
		unique: true,
	},
	image: {
		type: String,
	},

	address: {
		type: String,
		required: true,
	},
	principal: {
		type: String,
		required: true,
	},
	budget: {
		type: Number,
	},
	departments: [
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
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: "Student",
		},
	],
	// nte: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: "NTE",
	// 	},
	// ],
});

const School = model("School", schoolSchema);
module.exports = School;
