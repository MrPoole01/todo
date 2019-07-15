/*jshint esversion: 6 */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const collection = require("crud_todo");

const db = require("./db");

app.use(bodyParser.json());

db.connect(err => {
  if (err) {
    console.log("unable to connect to database");
    process.exit(1);
  } else {
    app.listen(3000, () => {
      console.log("connectes to database");
    });
  }
});