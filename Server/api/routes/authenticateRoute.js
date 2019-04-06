var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs');
var privateKey = fs.readFileSync('./private.key')
router.use('/', (req,res,next) => {
    // console.log(req);
    
    jwt.verify(req.body.token, privateKey,(err, decoded) => {
        if(err) req.error = err;
        else req.id = decoded.id;
        // console.log(decoded);
        
        next();
    });
})
module.exports = router;