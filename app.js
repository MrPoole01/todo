/*jshint esversion: 6 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const collection = "crud_todo";

const db = require("./db.js");

app.use(bodyParser.json());

// serve static html file to user
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// read
app.get('/getTodos', (req,res) => {
  db.getDB().collection(collection).find({}).toArray((err, documents) => {
    if (err) {
      console.log(err);
    } else {
      console.log(documents);
      res.json(documents);
    }
  });
});

// update
//app.put('/', (req,res) => {

//})

db.connect(err => {
  if (err) {
    console.log("unable to connect to database");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log("connected to database");
    });
  }
});
