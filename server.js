const express = require('express');
const earthview = require('./src/api/earthview');

var app = express();
const port = process.env.PORT || '4040';

app.use('/', earthview);

app.listen(port, function () {
  console.log('Listening on http://localhost:' + port + '...');
});

exports = module.exports = app;