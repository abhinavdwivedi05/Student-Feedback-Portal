const Course = require('../models/Course');


exports.listCourses = async (req, res) => {
const courses = await Course.find();
res.json(courses);
};


exports.addCourse = async (req, res) => {
const { courseName, facultyName } = req.body;
const course = new Course({ courseName, facultyName });
await course.save();
res.json(course);
};