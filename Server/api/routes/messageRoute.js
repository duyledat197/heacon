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
    console.log("hello:::");
    console.log(req.id);
    
    friendModel.findOne({ id: req.id }).then(data => {
        
        console.log("Data::::");
        
        console.log(data);
        
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json(err);

    })
})
router.post('/load', (req, res) => {
    messageModel.findOne({ id: req.id }, (err, listFriend) => {
        if (!err) {
            let indexFriend = listFriend.friend.findIndex((friend) => {
                return friend.id === req.body.idFriend
            })          
            let length_array = listFriend.friend[indexFriend].message.length;
            var array_message;
            if (length_array < 10) {
                array_message = listFriend.friend[indexFriend].message;
            }
            else {
                array_message = listFriend.friend[indexFriend].message.slice(length_array - 10, length_array - 1);
            }
            res.status(200).json(array_message);
        }
        else res.status(500).json(err);
    })
})

router.post('/p', (req, res) => {


})

module.exports = router;