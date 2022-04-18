const { Schema, model } = require('mongoose');

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
        required: true
    }
})
const School = model('School', schoolSchema);
module.exports = School;