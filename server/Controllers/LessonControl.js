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
  }
};
