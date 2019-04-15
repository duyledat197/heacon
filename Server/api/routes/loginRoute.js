var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var userModel = require('./../../models/userModel');
var fs = require('fs');
var bcrypt = require('bcrypt');
var privateKey = fs.readFileSync('./private.key');
router.post('/', (req, res) => {
    userModel
    .findOne({userName : req.body.userName})
    .then((user) => {
        bcrypt.compare(req.body.password, user.password , (err, resq) =>{
            if(!err) {
                console.log(resq);
                if(resq) {
                //    var tokenn =  jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), data : user.id }, "privateKey")
                jwt.sign({
                    id : user.id
                  }, privateKey , { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) }, (errr,token) => {
                        if(!errr) res.status(200).json({token : token, success : true});
                        else res.status(500).json(erer);
                    
                  });
                //    (errr, token) => {
                    // , { algorithm: 'RS256' }
                    //     if(!errr) res.status(200).json({token : token, success : true});
                    //     else res.status(500).json(errr);
                    //   });
                    //   console.log(token);
                      
                }
                else res.status(200).json({success : false, text : "Sai Tài Khoản hoặc Mật Khẩu"});
            }
            else res.status(500).json(err);

        });
    })
    .catch((err) => {
        res.status(500).json(err);
    })
})

module.exports = router;