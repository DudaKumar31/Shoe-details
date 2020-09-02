var express = require('express');
const app = express();


app.get('/' ,function (req, res){
    res.write("<h1> welcome</h1>");
    res.end();

});

app.get('/p',function (req, res){
    res.write("page2");
    res.end();
});

var server = app.listen(3000, function(){

    var host = server.address().address;
    var port = server.address().port;
    console.log("server running at http://localhost:%s",port);

});