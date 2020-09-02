const http = require ('http');

console.log('connected');
http.createServer(function(req, res){

res.write('hello world');
res.end();


}).listen(3000);