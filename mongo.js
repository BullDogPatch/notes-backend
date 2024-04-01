const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://craigclayton:${password}@cluster0.xpxvblq.mongodb.net/NoteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'Craig is the best Programmer in the world',
  important: true,
});

// Note.find({ important: true }).then(result => {
//   result.forEach(note => {
//     console.log(note);
//   });
// });

note.save().then(result => {
  console.log('note save', result);
  mongoose.connection.close();
});
