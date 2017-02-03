var express = require('express');
var router = express.Router();
var mongoOp = require("../models/accounts");

router.route("/login")
    .post(function(req,res){
        var db = new mongoOp.accounts();
        var response = {};
        mongoOp.accounts.find({email:req.profile.Email},function(err,data){
            if(err){
                res.json({"error":true, "message":true});
            }else{
                if(data != {}){
                    response = {"error":false, "message":data};
                    res.json(response);
                }else{
                    console.log('created');
                    db.accounts.email = req.body.Email;
                    db.save(function(err){
                        if(err) {
                            response = {"error" : true,"message" :err };
                            res.json(response);
                            console.log('old');
                        } else {
                            mongoOp.accounts.find({email:req.profile.Email},function(err,data){
                                response = {"error":false, "message":data};
                                res.json(response);
                            });
                            console.log('new');
                        }
                    });
                }
            }
        });
    });
module.exports = router;
