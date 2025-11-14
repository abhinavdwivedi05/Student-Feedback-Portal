require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');


const app = express();
app.use(cors());
app.use(bodyParser.json());


connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/feedback_db');


app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/feedback', require('./routes/feedback'));


app.get('/', (req,res)=>res.send('Student Feedback API'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`));