var express = require('express');
var app = express();
var http = require('http').Server(app);
http.listen(process.env.PORT || 7000, '0.0.0.0');
console.log('localhost:7000')
app.use(express.static('./'));

app.get('*', function(req, res){
  res.sendfile('index.html');
});
