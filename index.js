// const http = require("http");

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Context-Type": "text/plain" });
//   response.end("helllo world");
// });

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

require("dotenv").config();
// let notes = [
//   {
//     id: 5,
//     content: "im always da  pakka",
//   },
//   {
//     id: 6,
//     content: "im always pakka",
//   },
//   {
//     id: 7,
//     content: "im always pakkaaaaaa",
//   },
// ];

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

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

//create a model

// const Note = mongoose.model("Note", noteSchema, "notes");
const Note = require("./models/note");

app.get("/", (request, response) => {
  response.send("<h1>Notes App </h1>");
});

// app.get("/api/notes", (request, response) => {
//   response.json(notes);
// });

app.get("/api/notes", (request, response) => {
  Note.find({}, {}).then((notes) => {
    response.json(notes);
  });
});

// post request work aagarthukaana code idhudhan
app.post("/api/notes", (request, response) => {
  const note = new Note(request.body);
  note.save().then((result) => {
    response.status(201).json({ message: "note saved da dei" });
  });
});

//fetching a single resource
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;

  Note.findById(id)
    .then((note) => {
      if (!note) {
        return response.status(404).json({ error: "Note not found da" });
      }

      response.json(note);
    })
    .catch((error) => {
      response.status(500).json({ error: "Internal Server Error" });
    });
});

// deleting a single resource
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;

  Note.findByIdAndDelete(id)
    .then((deletedNote) => {
      if (!deletedNote) {
        return response
          .status(404)
          .json({ error: "deleted Note not found da" });
      }

      response.status(204).json({ message: "delete aaidchi da" });
    })
    .catch((error) => {
      response.status(500).json({ error: "Internal Server Error" });
    });
});

const PORT = process.env.PORT || 4008;
app.listen(PORT);

console.log(`server running on port ${PORT}`);
