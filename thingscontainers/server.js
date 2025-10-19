var express = require('express');
var things = require('./things');
var session = require('express-session');
require('dotenv').config();

var app = express();
var PORT = process.env.PORT || 3000;

// Third party middleware to count requests
app.use(session({ secret: "Shh, it's a secret!",})); 
app.get('/', function (req, res) { 
    if (req.session.page_views) {
        req.session.page_views++;
        res.send('You have visited this page ' + req.session.page_views + ' times');
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    } 
});

// First Middleware 
app.use(function(req, res, next) {
    console.log('First Middleware');
    next();
});

// Middleware to log requests
app.use('/things', function(req, res, next) {
    console.log('A request for things received at ' + Date.now());
    next();
});

app.use('/things', things);
app.use(express.json());

app.listen(PORT)