var express = require('express');
var router = express.Router();
var messageModel = require('../../models/messageModel');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var privateKey = fs.readFileSync('./private.key')
router.post('/', (req, res) => {
    // messageModel.find({id : req.body.id})
    // .then((data) => {
    //     res.status(200).json(data);
    // })
    // .catch((err) => {
    //     res.status(500).json(err);
    // })
    console.log(req.body.token);
    
    jwt.verify(req.body.token, privateKey, (err, decoded) => {
        
        if(err) res.status(500).json(err);
        else console.log(decoded);
        
        
    })
    // console.log(req.io);
    
    req.io.on('connection', (socket) => {
        socket.on('CLIENT_SEND_MESSAGE', (data) => {
            jwt.verify(data.token, 'PUBLIC_KEY', (err, decoded) => {
                if(err) socket.emit('ERROR', err);
                else {
                    socket.to(data.friend.id).emit('CLIENT_SEND_TO_FRIEND', data);
                }
            })
        })
    })    
})

module.exports = router;