const Story = require("../../models/story.model");

exports.createStory = async (req, res) => {
  const { title, text } = req.body;

  try {
    if (title && text) {
      const newStory = await Story.create({
        title: title,
        text: text
      });

      if (newStory) {
        return res.status(201).json(newStory);
      }
    }

    return res.status(400).json({ message: 'Title and text are required fields' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the story' });
  }
};

exports.updateStory = async (req, res) => {
  const _id = req.params.id;

  try {
    const story = await Story.findById(_id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const { title, text } = req.body;

    if (title && text) {
      story.title = title;
      story.text = text;

      const updatedStory = await story.save();

      return res.status(200).json({ message: 'Story updated successfully', updatedStory });
    }

    return res.status(400).json({ message: 'Title and text are required fields' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while updating the story' });
  }
};


exports.deleteStory = async (req, res) => {
  const _id = req.params.id;

  try {
    const story = await Story.findByIdAndRemove(_id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    return res.status(200).json({ message: 'Story deleted successfully', deletedStory: story });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the story' });
  }
};


exports.addvocabulary = async (req, res) => {
  const storyId = req.params.storyId;
  const vocabularyItem = req.body;

  try {

    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    story.vocabulary.push(vocabularyItem);
    await story.save();

    res.status(201).json({ message: 'Vocabulary item added to the story', vocabularyItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the vocabulary item' });
  }
}



exports.addcorrectword = async (req, res) => {
  const storyId = req.params.storyId;
  const correctWord = req.body;

  try {
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    story.correctWords.push(correctWord);
    await story.save();

    res.status(201).json({ message: 'Correct word added to the story', correctWord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the correct word' });
  }
}

// exports.incorrectword = async (req, res) => {
//   const storyId = req.params.storyId;
//   const incorrectWord = req.body;

//   try {
//     const story = await Story.findById(storyId);

//     if (!story) {
//       return res.status(404).json({ error: 'Story not found' });
//     }

//     story.incorrectWords.push(incorrectWord);
//     await story.save();

//     res.status(201).json({ message: 'Incorrect word added to the story', incorrectWord });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while adding the incorrect word' });
//   }

// }

exports.bluredword = async (req, res) => {
  const storyId = req.params.storyId;
  const blurredWord = req.body.blurredWord;

  try {
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    story.blurredWords.push(blurredWord);
    await story.save();

    res.status(201).json({ message: 'Blurred word added to the story', blurredWord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the blurred word' });
  }
}


exports.fillinblanks = async (req, res) => {
  const storyId = req.params.storyId;
  const fillInBlankExercise = req.body;

  try {
    // Find the story by its ID
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    // Add the fill-in-the-blank exercise to the story's array of exercises
    story.fillInBlankExercises.push(fillInBlankExercise);

    // Save the updated story
    await story.save();

    res.status(201).json({ message: 'Fill-in-the-blank exercise added to the story', fillInBlankExercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the fill-in-the-blank exercise' });
  }
}