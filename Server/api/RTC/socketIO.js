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

function recordMessage(id, idFriend, idSend, text, date) {
    // let idMessage = uid(10);


    messageModel.findOne({ id: id }, (err, listfriend) => {
        let indexFriend = listfriend.friend.findIndex((friend) => {
            return friend.id === idFriend
        })
        let message = {
            id: idSend,
            text: text,
            date: date
        }
        listfriend.friend[indexFriend].message.push(message);
        listfriend.save((err) => { });

    })
}
module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('disconnected', () => {
            Male = Male.filter((male) => {
                return male.socketID != socket.id
            })
            Female = Female.filter((female) => {
                return female.socketID != socket.id
            })
            let id = mapsocketID[socket.id];
            mapsocketID[socket.id] = -1;
            mapID[id] = -1;
        })
        socket.on('FIND_LOVER', (idd) => {
            infoUserModel.findOne({ 'id': idd }, (err, info) => {
                if (err) socket.emit('ERROR', err);
                else {
                    var gender = info.gender;
                    var lastTime = Date.now();
                    if (gender == 'male') {
                        if (Female.length > 0) {
                            var friendId = Female[0].id;
                            var friendName = Female[0].name;
                            socket.emit('FIND_OUT', Female[0].id);
                            io.to(Female[0].socketID).emit('FIND_OUT', info.id);
                            Female.shift();
                            initFriendModel(info.id, friendId, friendName, lastTime);
                            initChatModel(info.id, friendId, lastTime);

                            initFriendModel(friendId, info.id, info.firstName + " " + info.lastName, lastTime);
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
                            var friendId = Male[0].id;
                            var friendName = Male[0].name;
                            socket.emit('FIND_OUT', Male[0].id);
                            io.to(Male[0].socketID).emit('FIND_OUT', info.id);
                            // console.log(info.id);

                            // console.log(Male[0].id);

                            initFriendModel(info.id, friendId, friendName, lastTime);
                            initChatModel(info.id, friendId, lastTime);

                            initFriendModel(friendId, info.id, info.firstName + " " + info.lastName, lastTime);
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
            // console.log(data);

            jwt.verify(data.token, privateKey, (err, decoded) => {
                if (err) socket.emit('ERROR', err);
                else {
                    mapID[decoded.id] = socket.id;
                    mapsocketID[socket.id] = decoded.id;
                    console.log(mapID);
                    
                }
            })
        })
        socket.on('CLIENT_SEND_MESSAGE', (data) => {
            console.log('CLIENT_SEND_MESSAGE:::');
            // console.log(data);

            jwt.verify(data.token, privateKey, (err, decoded) => {
                if (err) socket.emit('ERROR', err);
                else {
                    let date = Date.now();
                    let message = {
                        id: decoded.id,
                        text: data.message.text,
                        date: date
                    }
                    recordMessage(decoded.id, data.message.idFriend, decoded.id, data.message.text, date);
                    recordMessage(data.message.idFriend, decoded.id, decoded.id, data.message.text, date);
                    socket.emit('SEND_MESSAGE_TO_CLIENT', message);
                    console.log(mapID);
                    if(mapID[data.message.idFriend] !== -1)
                        io.to(mapID[data.message.idFriend]).emit('SEND_MESSAGE_TO_CLIENT', message);

                }
            })
        })
    })
} 