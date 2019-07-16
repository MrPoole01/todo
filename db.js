/*jshint esversion: 6 */

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = "crud_todo";
const url = "mongodb://localhost:27017";

const state = {
  db : null
}; 

const connect = (cb) => {
  if (state.db)
    cb();
  else {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        cb (err);
      } else {
        state.db = client.db(dbname);
        cb ();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
};

const getDB = () => {
  return state.db;
};

module.exports = {getDB, connect, getPrimaryKey};