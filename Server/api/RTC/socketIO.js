var uid = require('uid');
var messageModel = require('./../../models/messageModel');
var infoUserModel = require('./../../models/infoUserModel');
var friendModel = require('./../../models/friendModel');
var fs = require('fs');
var jwt = require('jsonwebtoken')
var privateKey = fs.readFileSync('./private.key');
var map = {};
var Male = [];
var Female = [];
var uid = require('uid');
module.exports = function(io){
    io.on('connection', (socket) => {
        // console.log('client connecting');
        // console.log(socket.id);
        
        socket.on('disconnected',() => {
            Male = Male.filter((male) => {
                return male.socketID != socket.id
            })
            Female = Female.filter((female) => {
                return female.socketID != socket.id
            })
        })

        // socket.on('authenticate', (data) => {
        //     console.log(data.token); 
        //     jwt.verify(data.token, privateKey, (err, decoded) =>{
        //         if(err) socket.emit('ERROR', err);
        //         else {
        //             socket.id = decoded;
        //             socket.emit('ID_USER',decoded);
        //         }
        //     })
        // })
        socket.on('FIND_LOVER', (idd) =>{
            console.log(idd);
            // socket.io.engine.id = id;
            // console.log(socket.io.engine.id);
            // socketID.find
            infoUserModel.findOne({'id' : idd},(err, info) =>{
                if(err) socket.emit('ERROR', err);
                else {
                    // console.log(info);
                    
                    var gender = info.gender;
                    // console.log("gender" + gender);
                    
                    if(gender == 'male'){
                        if(Female.length > 0){
                            // console.log( 'female : ' + Female[0]);
                            var friendId = Female[0].id;
                            var friendName = Female[0].name;
                            socket.emit('FIND_OUT', Female[0].id);
                            io.to(Female[0].socketID).emit('FIND_OUT', info.id);
                            var lastTime = Date.now();
                            
                            friendModel.findOne({id : friendId}, (err, user) => {
                                if(!err) {
                                    // console.log(listuser);
                                    
                                   user.friend.push({
                                        id : info.id,
                                        name : info.firstName + " " + info.lastName,
                                        lastMessage : "Xin Chao !!!",
                                        lastTime : lastTime
                                    })
                                    user.save();
                                }
                            })
                            friendModel.findOne({id : info.id}, (err, user) => {
                                if(!err) {
                                    user.friend.push({
                                        id : friendId,
                                        name : friendName,
                                        lastMessage : 'Xin Chao !!!',
                                        lastTime : lastTime
                                    })
                                    user.save();
                                }
                            })
                            Female.shift();
                        }
                        else Male.push({id : info.id, socketID : socket.id, name : info.firstName + " " + info.lastName});
                    }
                    else {
                        if(Male.length > 0){    
                            // console.log('male :' + Male[0].id);
                            var friendId = Male[0].id;
                            var friendName = Male[0].name;
                            socket.emit('FIND_OUT', Male[0].id);
                            io.to(Male[0].socketID).emit('FIND_OUT', info.id);
                            console.log(info.id);
                            
                            
                            // console.log(Male[0].id);
                            
                            friendModel.findOne({id : friendId}, (err, friend) => {
                                if(!err) {
                                    friend.push({
                                        id : info.id,
                                        name : firstName + " " + lastName,
                                        lastMessage : "Xin Chao !!!",
                                        lastTime : lastTime
                                    })
                                    friendModel.save();
                                }
                            })
                            friendModel.findOne({id : info.id}, (err, friend) => {
                                if(!err) {
                                    friend.push({
                                        id : friendId,
                                        name : friendName,
                                        lastMessage : "Xin Chao !!!",
                                        lastTime : lastTime
                                    })
                                    friendModel.save();
                                }
                            })
                            Male.shift();
                        }
                        else Female.push({id : info.id, socketID : socket.id, name : info.firstName + " " + info.lastName});
                    }
                }
            })
        })
        socket.on('CONNECT_MESSAGE', (data) => {
            jwt.verify(data.token, privateKey, (err, decoded) => {
                if(err) socket.emit('ERROR', err);
                else {
                    map[decoded.id] = socket.id;
                }
            })
        })
        socket.on('CLIENT_SEND_MESSAGE', (data) => {
            jwt.verify(data.token, privateKey, (err, decoded) => {
                if(err) socket.emit('ERROR', err);
                else {
                    messageModel.find({ id : data.message.id}, (err, infoMessage) => {
                        if(err) socket.emit('ERROR', err);
                        else {
                            var message = {
                                id : uid(10),
                                text : data.text,
                                date : Date.now()
                            }
                            var position = infoMessage.indexOf(infoMessage.friend.filter(e => e.id == data.friendId));
                            messageModel.friend[position].message.push(message)
                            // let message = {
                            //     id : idMessage,
                            //     text : data.message.text,
                            //     date : data.message.date
                            // }
                            infoMessage.save((err) => {
                                socket.emit('ERROR', err);
                            })
                           
                            // listfriend.findOne({id : decoded.id},(err, friend) => {
                            //     if(err) socket.emit('ERROR', err);
                            //     else {
                            //         let message = {
                            //             id : idMessage,
                            //             text : data.message.text,
                            //             date : data.message.date
                            //         }
                            //         friend.push(message);
                            //         listfriend.save((err) => {
                            //             if(err) socket.emit('ERROR', err);
                            //         });
                            //     }

                            // })

                        }
                    })
                     
                    messageModel.find({ id : decoded.id}, (err, listfriend) =>{
                        if(err) socket.emit('ERROR', err);
                        else {
                            listfriend.find({id : data.message.id}, (err, friend) => {
                                if(err) socket.emit('ERROR', err);
                                else {
                                    let message = {
                                        id : idMessage,
                                        text : data.message.text,
                                        date : data.message.date
                                    }
                                    friend.push(message);
                                    listfriend.save((err) => {
                                        if(err) socket.emit('ERROR', err);
                                    });
                                }
                            })
                        }
                    })
                }
 
            })
        })
    })    
} 