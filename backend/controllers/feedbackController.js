const Feedback = require('../models/Feedback');
const Course = require('../models/Course');
const createCsvWriter = require('csv-writer').createObjectCsvStringifier;


exports.submitFeedback = async (req, res) => {
const { courseId, rating, comments } = req.body;
try {
const existing = await Feedback.findOne({ studentId: req.user._id, courseId });
if (existing) {
// update
existing.rating = rating;
existing.comments = comments;
await existing.save();
return res.json(existing);
}
const feedback = new Feedback({ studentId: req.user._id, courseId, rating, comments });
await feedback.save();
res.json(feedback);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
};


exports.getCourseFeedback = async (req, res) => {
const { id } = req.params;
const items = await Feedback.find({ courseId: id }).populate('studentId','name email');
res.json(items);
};


exports.getAllFeedback = async (req, res) => {
const items = await Feedback.find().populate('studentId','name email').populate('courseId','courseName');
res.json(items);
};


exports.exportCSV = async (req, res) => {
};