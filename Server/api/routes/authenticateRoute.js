var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var privateKey = fs.readFileSync('./private.key')
router.use('/', (req,res,next) => {
     console.log(req.body);
    
    jwt.verify(req.body.token, privateKey,(err, decoded) => {
        console.log(err);
        // console.log();
        
        if(err) {
            req.error = err;
            req.id = null;
        }
        else {
            req.error = null;
            req.id = decoded.id;
        }
        // console.log(decoded);
        
        next();
    });
})
module.exports = router;