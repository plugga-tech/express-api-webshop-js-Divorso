// let http = require('http');
// http
//   .createServer(function (req, res) {
//     req.writeHead(200, { 'Content-Type': 'text/plaibn' });
//     req.end('hello world mr');
//   })
//   .listen(4040);

// console.log('servern funkar och är igång på local');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('.routes/index');
var usersRouter = require('.routes/index');

var app = express();
