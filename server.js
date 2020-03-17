const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;



const app = express();
// Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// path1 = path.basename("../public/index.html");
// path2 = path.basename("../public/notes.html");



app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/notes.html"));
    
  });

  app.get("/api/notes", (req, res) => {
    const note = req.params.note;
    console.log(note);

  app.get("*", (req, res) => {
    // var path = require('path');
    // var filePath = "./public/index.html"
    // var resolvedPath = path.resolve(filePath);
    // console.log(resolvedPath);
    // return res.sendFile(resolvedPath);
    res.sendFile(path.join(__dirname, "/index.html"));
  });

    let found;

    characters.forEach(char => {
      if(character === char.routeName) {
        found = char;
      }
    });
  
    res.json(found || { success: false });
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
  
    newNote.routeName = req.body.name.split(" ").join("").toLowerCase();
  
    notes.push(newNote);
  
    res.db.json(newNote);
  });
  
  app.listen(PORT, () => {
    console.log(`Server is listening port: ${PORT}`);
  });