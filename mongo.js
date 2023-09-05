const mongoose = require("mongoose");

const url = `mongodb+srv://balaji:balapass@cluster0.azqam1s.mongodb.net/NotesApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

//connect to the database
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to mongodb database");
  })
  .catch((error) => {
    console.log("eroor da");
  });

//create a schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

//create a model

const Note = mongoose.model("Note", noteSchema, "notes");

//to store a data in the database

// prepare a new object
const note = new Note({
  content: "call back functions are  not cool",
  important: true,
});

// store the data to the database
note.save().then((result) => {
  console.log("note sAVED  !");
  mongoose.connection.close();
});
