const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const collection = require('todo');

const db = require('./db');

app.use(bodyParser.json());

