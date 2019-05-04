var uid = require('uid');
var messageModel = require('./../../models/messageModel');
var infoUserModel = require('./../../models/infoUserModel');
var friendModel = require('./../../models/friendModel');
var fs = require('fs');
var jwt = require('jsonwebtoken')
var privateKey = fs.readFileSync('./private.key');
var mapID = {};
var mapsocketID = {};
var Male = [];
var Female = [];
var uid = require('uid');

function initFriendModel(id, idFriend, friendName, lastTime) {

    friendModel.findOne({ id }, (err, user) => {
        if (!err) {
            user.friend.push({
                id: idFriend,
                name: friendName,
                lastMessage: 'Xin Chao !!!',
                lastTime: lastTime
            })
            user.save();
        }
    })
}
function initChatModel(id, idFriend, date) {
    messageModel.findOne({ id }, (err, user) => {
        if (!err) {
            user.friend.push({
                id: idFriend,
                message: [
                    {
                        id: uid(10),
                        text: "Xin Chao !!!",
                        date,
                    }
                ]
            })
            user.save();
        }
    })

}
module.exports = function (io) {
    io.on('connection', (socket) => {
        // console.log('client connecting');
        // console.log(socket.id);

        socket.on('disconnected', () => {
            Male = Male.filter((male) => {
                return male.socketID != socket.id
            })
            Female = Female.filter((female) => {
                return female.socketID != socket.id
            })
            let id = mapsocketID[socket.id];
            delete mapsocketID[socket.id];
            delete mapID[id];
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
        socket.on('FIND_LOVER', (idd) => {
            console.log(idd);
            // socket.io.engine.id = id;
            // console.log(socket.io.engine.id);
            // socketID.find
            infoUserModel.findOne({ 'id': idd }, (err, info) => {
                if (err) socket.emit('ERROR', err);
                else {
                    // console.log(info);

                    var gender = info.gender;
                    var lastTime = Date.now();
                    // console.log("gender" + gender);

                    if (gender == 'male') {
                        if (Female.length > 0) {
                            // console.log( 'female : ' + Female[0]);
                            var friendId = Female[0].id;
                            var friendName = Female[0].name;
                            socket.emit('FIND_OUT', Female[0].id);
                            io.to(Female[0].socketID).emit('FIND_OUT', info.id);
                            Female.shift();
                            initFriendModel(info.id, friendId, friendName, lastTime);
                            initChatModel(info.id, friendId, lastTime);

                            initFriendModel(friendId, info.id, friendName, lastTime);
                            initChatModel(friendId, info.id, lastTime);
                        }
                        else Male.push({
                            id: info.id,
                            socketID: socket.id,
                            name: info.firstName + " " + info.lastName
                        });
                    }
                    else {
                        if (Male.length > 0) {
                            // console.log('male :' + Male[0].id);
                            var friendId = Male[0].id;
                            var friendName = Male[0].name;
                            socket.emit('FIND_OUT', Male[0].id);
                            io.to(Male[0].socketID).emit('FIND_OUT', info.id);
                            console.log(info.id);

                            // console.log(Male[0].id);

                            initFriendModel(info.id, friendId, friendName, lastTime);
                            initChatModel(info.id, friendId, lastTime);

                            initFriendModel(friendId, info.id, friendName, lastTime);
                            initChatModel(friendId, info.id, lastTime);
                            Male.shift();
                        }
                        else Female.push({ id: info.id, socketID: socket.id, name: info.firstName + " " + info.lastName });
                    }
                }
            })
        })
        socket.on('CLIENT_CONNECT_MESSAGE', (data) => {
            console.log('CLIENT_CONNECT_MESSAGE:::');
            console.log(data);

            jwt.verify(data.token, privateKey, (err, decoded) => {
                if (err) socket.emit('ERROR', err);
                else {
                    mapID[decoded.id] = socket.id;
                    mapsocketID[socket.id] = decoded.id;
                }
            })
        })
        socket.on('CLIENT_SEND_MESSAGE', (data) => {
            console.log('CLIENT_SEND_MESSAGE:::');
            console.log(data);

            jwt.verify(data.token, privateKey, (err, decoded) => {
                if (err) socket.emit('ERROR', err);
                else {
                    let idMessage = uid(10);

                    let date = Date.now();
                    messageModel.findOne({ id: data.message.idFriend }, (err, listfriend) => {
                        if (err) socket.emit('ERROR', err);
                        else {
                            // let message = {
                            //     id : idMessage,
                            //     text : data.message.text,
                            //     date : data.message.date
                            // }
                            console.log("listfriend::::");
                            console.log(listfriend.friend);


                            listfriend.friend.findOne({ id: decoded.id }, (err, friend) => {
                                if (err) socket.emit('ERROR', err);
                                else {
                                    let message = {
                                        id: idMessage,
                                        text: data.message.text,
                                        date: date
                                    }
                                    friend.message.push(message);
                                    listfriend.save((err) => {
                                        if (err) socket.emit('ERROR', err);
                                        else {
                                            var message = {
                                                id: decoded.id,
                                                message: {
                                                    id: data.message.idFriend,
                                                    text: data.message.text
                                                }
                                            }
                                            io.to(mapID[data.message.id]).emit('SEND_MESSAGE_TO_CLIENT', message);
                                        }

                                    });
                                }

                            })
                        }
                    })

                    messageModel.find({ id: decoded.id }, (err, listfriend) => {
                        if (err) socket.emit('ERROR', err);
                        else {
                            listfriend.friend.find({ id: data.message.id }, (err, friend) => {
                                if (err) socket.emit('ERROR', err);
                                else {
                                    let message = {
                                        id: idMessage,
                                        text: data.message.text,
                                        date: data.message.date
                                    }
                                    friend.message.push(message);
                                    listfriend.save((err) => {
                                        if (err) socket.emit('ERROR', err);
                                        else socket.emit('SEND_DATA_SUCCESS', { success: true });
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