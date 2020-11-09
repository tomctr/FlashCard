const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    name: {type: String, require: true},
    questions: [{ body: String, answer: String, supplement: [String] }],
});

module.exports = mongoose.model('lesson', LessonSchema);
