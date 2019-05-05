var express = require('express');
const fileUpload = require('express-fileupload');
var router = express.Router();
var infoUserModel = require('./../../models/infoUserModel');
var authenticate = require('./authenticateRoute');

router.use(authenticate);
router.use('/edit/profile', fileUpload());
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
router.post('/friend',(req,res) => {
    infoUserModel.findOne({id : req.idFriend}, (err, info) => {
        if(err) res.status(500).json(err);
        else {
           
            
            res.status(200).json(info);
            // console.log(info);
        }  
    })
})

router.post('/edit/profile', (req,res) => {
    infoUserModel.findOne({id : req.id}, (err, info) => {
        if(err) res.status(500).json(err);
        else {
            // firstName : String,
            // lastName: String,
            // birthday: Date,
            // gender : String,
            // avatar: {
            //     imgSmall: String,
            //     imgBig: String
            // }
            info.firstName = req.body.firstName;
            info.lastName = req.body.lastName;
            info.gender = req.body.gender;
            let img = req.files.img;
            img.mv('public/avatar/' + req.id + '.jpg');
            // console.log(info);
        }  
    })
})
module.exports = router