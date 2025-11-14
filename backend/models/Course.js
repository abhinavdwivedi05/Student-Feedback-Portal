const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
courseName: { type: String, required: true },
facultyName: { type: String }
});
module.exports = mongoose.model('Course', courseSchema);