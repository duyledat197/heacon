var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userModel = require('./../../models/userModel');
var uid = require('uid');
var bcrypt = require('bcrypt');
var fs = require('fs');
var infoModel = require('./../../models/infoUserModel');
var friendModel = require('./../../models/friendModel');
var messageModel = require('./../../models/messageModel')
// var privateKey = fs.readFileSync('./private.key');
router.post('/', (req, res) => {
    console.log(JSON.stringify(req.body));

    userModel.findOne({ userName: req.body.userName }, (err, user) => {
        if (!err) {
            if (user) {
                res.status(200).json({
                    success: false,
                    text: "Tài khoản tồn tại"
                })
                console.log(user);

            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (!err) {
                        let userTempt = new userModel();

                        userTempt.userName = req.body.userName;
                        userTempt.password = hash;
                        userTempt.id = uid(10);
                        userTempt.save((err) => {
                            if (err) res.status(500).json(err);
                            else {
                                let infoTempt = new infoModel();
                                infoTempt.id = userTempt.id;
                                infoTempt.birthday = Date.parse(req.body.birthday);
                                infoTempt.firstName = req.body.firstName;
                                infoTempt.lastName = req.body.lastName;
                                infoTempt.gender = req.body.gender;
                                infoTempt.save((err) => {
                                    if (err) res.status(500).json(err);
                                    else {
                                        var friend = new friendModel();
                                        friend.id = userTempt.id
                                        friend.save((err) => {
                                            if (err) res.status(500).json(err);
                                            else {
                                                var messagemodel = new messageModel();
                                                messagemodel.id = userTempt.id;
                                                messagemodel.save(err => {
                                                    if (err) res.status(500).json(err);
                                                    else res.status(200).json({ success: true });
                                                })
                                            }
                                        })

                                    }
                                });
                            }
                        })
                    }
                    else res.status(500).json(err);

                })
            }
        }
        else res.status(500).json(err);
    })
})
module.exports = router;