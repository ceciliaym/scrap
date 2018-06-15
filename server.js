var express = require('express');

var mongoose = require('mongoose');

var expresshandlebars = require("express-handlebars");

var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine('handlebars', expresshandlebars({
    defaultLayout: 'main'
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

var db = process.env.MONGODB_URI || "mongodb://cecilia:1234567a@ds259620.mlab.com:59620/scraper";

mongoose.connect(db, function(error){
    if (error) {
        console.log("error");
    } else {
        console.log("mongoose connection is successful");
    }
});

app.listen(PORT, function(){
    console.log("listening on port:" + PORT);
});