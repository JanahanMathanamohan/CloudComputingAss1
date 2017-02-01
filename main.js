var express = require("express");
var bodyParser = require("body-parser");
var mongoOp = require("./models/accounts.js");
var router = express.Router();
var app = express();
var path = __dirname + '/www/';
router.get("/",function(req,res){
    res.sendFile(path + "index.html");
})
app.use("/",router);
app.listen(app.get('port'),function(){
    console.log('Node app is running on port', app.get('port'));
});


