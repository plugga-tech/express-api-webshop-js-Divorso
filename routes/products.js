var express = require('express');
var fs = require('fs');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

var users = fs.readFileSync('./backend/users_data.json', 'utf-8');
const usersObj = JSON.parse(users);
