const { Schema, model } = require("mongoose");

const classRoomSchema = new Schema({
	className: {
		type: String,
		required: true,
	},
	grade: {
		type: Number,
	},
	teacher: {
		type: Schema.Types.ObjectId,
		ref: "Teacher",
	},
	department: {
		type: Schema.Types.ObjectId,
		ref: "Department",
	},
	// add student roster as able
	// students: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: "Student",
	// 	},
	// ],
});

const ClassRoom = model("ClassRoom", classRoomSchema);
module.exports = ClassRoom;
