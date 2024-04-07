const notesRouter = require('express').Router();
const Note = require('../models/notes');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get('/:id', async (request, response) => {
  // Note.findById(request.params.id)
  //   .then(note => {
  //     if (note) response.json(note);
  //     else response.status(404).end();
  //   })
  //   .catch(error => next(error));

  const note = await Note.findById(request.params.id);

  try {
    if (note) response.json(note);
    else response.status(404).end();
  } catch (exception) {
    next(exception);
  }
});

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  try {
    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

notesRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const body = request.body;

    const note = {
      content: body.content,
      important: body.important,
    };

    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
