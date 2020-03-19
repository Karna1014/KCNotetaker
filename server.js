const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 7000;



const app = express();
// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('/public/index.html', { root: __dirname });
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
//url read and returned in JSON formate
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "db/db.json"), (error, data) =>{
    if (error) {
      throw error;
    } else {
      res.send(JSON.parse(data));
    }
  })
});

//initial route to home page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/gitindex.html"));
});

//method to receive info
app.post("/api/notes", (req, res) => {
  var notes = JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json"), (error, data) =>{
    if (error) {
      throw error;
    }
  }))
//assign id to each item
  var requestBody = req.body;
  requestBody["id"] = (notes.length + 1).toString();

  notes.push(requestBody);

  //new file created with id
  fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(notes, null, 2), (error, data) => {
    if (error) {
      throw error;
    }
  })

  res.send(notes);
});

app.delete("/api/notes/:id", (req, res) => {
  var notes = JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json"), (error, data) =>{
    if (error) {
      throw error;
    }
  }))

  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == req.params.id) {
      notes.splice(i, 1);
    }
  }

  fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(notes, null, 2), (error, data) => {
    if (error) {
      throw error;
    }
  })

  res.send(notes);
});

app.listen(PORT, () => {
  console.log(`Server is listening port: ${PORT}`);
});