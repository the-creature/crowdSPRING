var express = require('express');
var path = require('path');
var app = express();

var json = require('./users.json');

const publicPath = path.resolve('public');

app.get('/', function(req, res) {
  return res.sendfile('index.html', { root: publicPath });
});

app.get('/user/*', function(req, res) {
  return res.sendfile('index.html', { root: publicPath });
});

app.get('/getUsers', function(req, res) {
  res.json(json);
});

app.use(express.static(publicPath));

app.listen(3000, function() {
  console.log('Server listening on port 3000!');
});
