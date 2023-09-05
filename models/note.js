const mongoose = require("mongoose");

// const url = `mongodb+srv://balaji:balapass@cluster0.azqam1s.mongodb.net/NotesApp?retryWrites=true&w=majority`;
const url = process.env.MONGODB_URI;

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

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
