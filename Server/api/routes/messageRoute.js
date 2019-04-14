var express = require('express');
var router = express.Router();
var messageModel = require('../../models/messageModel');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var privateKey = fs.readFileSync('./private.key');
var authenticate = require('./authenticateRoute');
var friendModel = require('./../../models/friendModel');
router.use(authenticate);
router.post('/friends', (req, res) => {
    friendModel.findOne({id : req.id}).then(data => {
        console.log(data);
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json(err);
    })
})

router.post('/p', (req, res) => {
   
    if(req.err) res.status(500).json(err);
    else {
        messageModel.find({ id : req.body.id}).then( messageInfo => {
            messageInfo.friend.find({id : req.idfriend}).then(friend => {
                // var message = friend.message;
                friend.message.find({}).last(10).then(message => {
                    res.status(200).json(message);
                }).catch(err => {
                    res.status(500).json(err);
                })  
            }).catch(err => {
                res.status(500).json(err);
            })
        })
    }
      
})

module.exports = router;