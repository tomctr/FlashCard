const LessonModel = require("../Models/LessonModel");

module.exports = {
  create: (req, res) => {
    let lesson = new LessonModel({
      name: req.body.name,
      questions: req.body.questions,
    });
    lesson
      .save()
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
  findAll: async (req, res) => {
    try {
      const lessons = await LessonModel.find().select('name');
      res.json(lessons);
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },
  findByName: async (req, res) => {
    try {
      var lessonName = req.params.name;
      const lesson = await LessonModel.findOne({ name: lessonName });
      res.json(lesson);
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },
  addQuestionToLesson: async (req, res) => {
    try{
      var lessonName = req.params.name;
      console.log(lessonName);
      const lesson = await LessonModel.findOne({ name: lessonName });
      console.log(lesson)
      lesson.questions.push({
        supplement: req.body.supplement,
        body: req.body.body,
        answer: req.body.answer
      });

      lesson.save()
      .then((result) => {
        res.json({ success: true, result: result });
      })
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },
  getOneQuestion: async (req, res) => {
    try{
      var questionId = req.params.id;
      var lessonName = req.params.name;
      const lesson = await LessonModel.findOne({ name: lessonName });
      res.json(lesson.questions[questionId]);

    } catch (err) {
      res.json({ success: false, result: err });
    }
  },
  updateOneQuestion: async (req, res) => {
    try{
      var questionId = req.params.id;
      var lessonName = req.params.name;
      console.log(questionId)
      const lesson = await LessonModel.findOne({ name: lessonName });

      lesson.questions[questionId] = {
        supplement: req.body.supplement,
        body: req.body.body,
        answer: req.body.answer
      }

      console.log(lesson[questionId])

      lesson.save()
      .then((result) => {
        res.json({ success: true, result: result });
      })

    } catch (err) {
      res.json({ success: false, result: err });
    }
  },
  deleteQuestion: async (req, res) => {
    var questionId = req.params.id;
    var lessonName = req.params.name;

    const lesson = await LessonModel.findOne({ name: lessonName });

    lesson.questions.splice(questionId, 1);

    lesson.save()
    .then((result) => {
      res.json({ success: true, result: result });
    })
  }


};
