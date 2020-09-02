var express = require('express');
const app = express();

var mysql = require('mysql');



var bodyparser = require('body-parser');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "shoeproject",

});
connection.connect();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post('/register/', (req, res, next) => {

    // connection.on('error',(err)=>{


    var data = req.body;
    var product_name = data.product_name;
    var product_price = data.product_price;

    console.log(product_name, product_price);

    var sql = "INSERT INTO products (product_name, product_price) VALUES (?,?)";
    var values = [product_name, product_price];
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.json("Inserted Successfully");
        res.end();

    });
});

app.post('/user_registration/', (req, res, next) => {

    // connection.on('error',(err)=>{


    var data = req.body;
    var name = data.name;
    var email = data.email;

    var psw = data.psw;

    console.log(name, email, psw);

    var sql = "INSERT INTO user_registration (name, email, psw) VALUES (?,?,?)";
    var values = [name, email, psw];
    connection.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.json("user registered Successfully");
        res.end();

    });
});

// Login

app.post('/login/', (req, res, next) => {

    // connection.on('error',(err)=>{


    var data = req.body;
    //var name = data.name;
    var email = data.email;
    var psw = data.psw;

    console.log(email, psw);

    var sql = "SELECT * FROM user_registration WHERE email=?";
    // var values = [name, email, psw];
    connection.query(sql, [email], (err, result, fields) => {
        connection.on('error', (err) => {
            console.log("", err);
        });
        if (result && result.length) {
            console.log(result);
            if (psw == result[0].psw) {
                res.json("Login In successfully");
                res.end();
            }
            else {
                res.json("Wrong Password");
                res.end();
            }
        }
        else {
            res.json("User Not Found");
            res.end();
        }
    })
});



app.get('/getproducts/', (req, res, next) => {

    // connection.on('error',(err)=>{


    var data = req.body;
    // var product_name = data.product_name;
    // var product_price = data.product_price;

    // console.log(product_name, product_price);

    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        var obj = [];
        for (var i = 0; i < result.length; i++) {

            var kk = {};           // Object
            // kk['img'] = result[i].img;
            kk['product_name'] = result[i].product_name;
            kk['product_price'] = result[i].product_price;
            obj.push(kk);

        }

        json = JSON.stringify(obj, undefined, 2);
        res.write(json);
        res.end();

    })

    // let app = http.createServer((req, res) => {
    //     // Set a response type of plain text for the response
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });

    //     // Send back a response and end the connection
    //     res.end(json);
    // });

});

var server = app.listen(3000, function () {
    console.log("server running at http://localhost:3000");
});