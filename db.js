/*jshint esversion: 6 */

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbname = 'crud_todo';

const url = 'mongodb://localhost:27017';
const mpngoOptions = {
  userNewUrlParser: true
};


const state = {
  db : null
};

const connect = (cd) => {
  if (state.db)
    cd();
  else {
    MongoClient.connect(url, mongoOptions, (err, client) => {
      if (err)
        cd(err);
      else {
        state.db = client.db(dbname);
        cd();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return ObjectID(_id);
};

const getDB = () => state.db;

module.exports = {getDB, connect, getPrimaryKey};