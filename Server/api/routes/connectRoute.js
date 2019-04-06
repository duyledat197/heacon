var express = require('express');
var router = express.Router();
var authenticateRoute = require('./authenticateRoute');
var infoUerModel = require('./../../models/infoUserModel');
router.use(authenticateRoute);
var MaleQueue = [];
var FemaleQueue = [];
router.post('/', (req, res) => {
    if(req.err) res.status(500).json(err);
    else {
        infoUerModel.findOne({ id : req.id}).then(resp => {
            if(resp.data.gender == 'Male') MaleQueue.push(req.id);
            else FemaleQueue.push(req.id);
        })
    }
})
router.post('/find', (req, res) => {
    if(req.err) res.status(500).json(err);
    else {
        
    }
})

module.exports = router