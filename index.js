// const http = require("http");

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Context-Type": "text/plain" });
//   response.end("helllo world");
// });

const express = require("express");
const app = express();

let notes = [
  {
    id: 5,
    content: "im always da  pakka",
  },
  {
    id: 6,
    content: "im always pakka",
  },
  {
    id: 7,
    content: "im always pakkaaaaaa",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Notes App </h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

const PORT = 3006;
app.listen(PORT);

console.log(`server running on port ${PORT}`);
