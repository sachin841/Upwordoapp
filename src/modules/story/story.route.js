const express = require('express')
const { createStory, updateStory, deleteStory, addvocabulary, incorrectword, bluredword, addcorrectword, fillinblanks } = require('./story.controller')

const router = express.Router()

router.post('/api/stories', createStory)
router.patch('/api/stories/:id', updateStory)
router.delete('/api/stories/:id', deleteStory)

router.post('/api/stories/:storyId/vocabulary', addvocabulary)
// router.post('/api/stories/:storyId/incorrect-words',incorrectword)
router.post('/api/stories/:storyId/blurred-words', bluredword)
router.post('/api/stories/:storyId/wordScores', addcorrectword)
router.post('/api/stories/:storyId/fill-in-blank-exercises', fillinblanks)

module.exports = router







