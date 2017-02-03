var express = require('express');
var router = express.Router();
var mongoOp = require("../models/accounts");
router.route("/login")
    .post(function(req,res){
        var db = new mongoOp.accounts();
        var response = {};
        mongoOp.accounts.find({email:req.body.Email},function(err,data){
            if(err){
                res.json({"error":true, "message":true});
            }else{
                if(data.length != 0){
                    response = {"create":true,"error":false, "message":data[0]};
                    res.json(response);
                }else{
                    console.log('created');
                    db.email = req.body.Email;
                    db.save(function(err){
                        if(err) {
                            response = { "error" :false ,"message":data[0]};
                            res.json(response);
                        } else {
                            mongoOp.accounts.find({email:req.body.Email},function(err,data){
                                response = {"create":false,"error":false, "message":data[0]};
                                console.log('new');
                                res.json(response);
                            });
                        }
                    });
                }
            }
        });
    })
    .get(function(req,res){
        var response = {};
        mongoOp.accounts.find({},function(err,data){
             res.json({'data':data});
        })
    });
module.exports = router;
