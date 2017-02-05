var express = require('express');
var router = express.Router();
var mongoOp = require("../models/accounts");
var Yelp = require('yelp');
var yelp = new Yelp({
    consumer_key: '7n1SJvJ2qyvHsjTn_YLb-A',
    consumer_secret: 'zkez3hKflfReXRqtC3l1HWr8BqM',
    token: 'CUXofq7RhHkE6_wDUoU-1ugpN9lxr068',
    token_secret: 'EYgyOWbwqrlGYoZeUYKlM_CIbeQ'
})
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
                    db.favourites = [];
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

router.route("/update")
    .post(function(req,res){
        var response = {};
        mongoOp.accounts.find({email:req.body.email},function(err,data){
            if(err){
                res.json({"error":true, "message":true});
            }else{
                if(data.length != 0){
                    data[0].favourites = req.body.favourites;
                    data[0].save(function(err){
                        if(err) {
                            response = { "error":true,"message":err};
                        } else {
                            response = {"error":false, "message":data[0]};
                        }
                        res.json(response);
                    });
                }else{
                    response = {"error":true, "message":"no email"};
                    res.json(response);
                }
            }
        });
    });

router.route("/yelpSearch")
    .post(function(req,res){
        yelp.search({
            term: req.body.term,
            location: req.body.location,
            limit: req.body.limit,
            sort: req.body.sort,
            radius_filter:  req.body.radius
        }).then(function (data) {
            res.json({error:false, message:data});
        }).catch(function (err) {
            res.json({error:true, message: err});
        });
    });
module.exports = router;
