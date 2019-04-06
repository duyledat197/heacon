var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// var uid = require('uid');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testDB');
var bodyParser = require('body-parser');
var mainController = require('./api/routes/homeRoute');
var excuteRTC = require('./api/RTC/socketIO');
var cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(app.router);
mainController(app);
excuteRTC(io);
var port = process.env.PORT | 3000;

// app.use('/message',(req,res,next) =>{
//     req.io = io;
//     next();
// });
server.listen(port, function(){
    console.log("listen to port : " + port);
});
