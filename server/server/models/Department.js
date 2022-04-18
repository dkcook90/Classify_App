const { Schema, model } = require('mongoose');

const departmentSchema = new Schema({
    department: {
        type: String,
        required: true
    },
    budget:{
        type: Number
    }
})

const Department = model("Department", departmentSchema)
module.exports = Department