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
		required: true,
	},
	department: {
		type: Schema.Types.ObjectId,
		ref: "Department",
		required: true,
	},
});

const ClassRoom = model("ClassRoom", classRoomSchema);
module.exports = ClassRoom;
