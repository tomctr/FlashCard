const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connect to database...'))
  .catch(err => console.error(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  console.log(req.body) 
  next()
})

const LessonControl = require('./Controllers/LessonControl');

app.post('/api/lesson/create', LessonControl.create);
app.get('/api/lesson/getall', LessonControl.findAll);
app.get('/api/lesson/getone/:name', LessonControl.findByName);
app.post('/api/lesson/addquestion/:name', LessonControl.addQuestionToLesson);
app.get('/api/lesson/getquestion/:name/:id', LessonControl.getOneQuestion);
app.post('/api/lesson/updatequestion/:name/:id', LessonControl.updateOneQuestion);
app.post('/api/lesson/deletequestion/:name/:id', LessonControl.deleteQuestion);


app.listen(process.env.PORT, function () {
  console.log('Example app listening on port 3000!')
});
