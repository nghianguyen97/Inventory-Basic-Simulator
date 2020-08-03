var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

// Note: you should really put these files in a subdirectory
// And use static like this:
app.use('/images', express.static(__dirname + 'public/images'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
