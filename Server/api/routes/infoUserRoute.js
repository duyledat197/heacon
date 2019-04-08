var express = require('express');
var router = express.Router();
var infoUserModel = require('./../../models/infoUserModel');
var authenticate = require('./authenticateRoute')
router.use(authenticate);
router.post('/',(req,res) => {
    // console.log(req.error);
    
    if(req.error) res.status(500).json(error);
    else {
        // console.log(req.id);
        infoUserModel.findOne({id : req.id}, (err, info) => {
            if(err) res.status(500).json(err);
            else {
               
                
                res.status(200).json(info);
                // console.log(info);
                
            }
        })
    }
})
module.exports = router