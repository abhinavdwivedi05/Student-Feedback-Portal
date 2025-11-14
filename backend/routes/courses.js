const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { listCourses, addCourse } = require('../controllers/courseController');


router.get('/', auth, listCourses);
router.post('/add', auth, async (req, res) => {
if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
return addCourse(req,res);
});


module.exports = router;