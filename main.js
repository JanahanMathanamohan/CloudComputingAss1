var express = require("express");
var bodyParser = require("body-parser");
var mongoOp = require("./models/accounts.js");
var app = express();
var router = express.Router();
var api = require('./routes/api');
var path = __dirname + '/www/';
router.get("/",function(req,res){
    res.sendFile(path + "index.html");
});
router.get("/api",api);
app.use("/",router);
app.use(express.static(__dirname + '/www'));
app.set('port', (process.env.PORT || 8180));
app.listen(app.get('port'),function(){
    console.log('Node app is running on port', app.get('port'));
});


