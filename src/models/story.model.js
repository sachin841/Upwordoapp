const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: String,
  text: String,
  vocabularyList: [{
    language: String,
    words: [String],
  }],
  wordScores: [{
    word: String,
    score: Number,
    isCorrect: Boolean,
  }],
  blurredWords: [String],
  fillInBlankExercises: [
    {
      sentence: String,
      missingWord: String,
      score: Number,
    },
  ],
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
