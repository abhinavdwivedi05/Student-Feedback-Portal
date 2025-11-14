const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { submitFeedback, getCourseFeedback, getAllFeedback, exportCSV } = require('../controllers/feedbackController');


router.post('/submit', auth, submitFeedback);
router.get('/course/:id', auth, getCourseFeedback);
router.get('/all', auth, async (req,res)=>{
if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
return getAllFeedback(req,res);
});
router.get('/export', auth, async (req,res)=>{
if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
return exportCSV(req,res);
});


module.exports = router;