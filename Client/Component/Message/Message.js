import React, { Component } from 'react';
import './Message.scss';
import { Route, BrowserRouter } from 'react-router-dom'
var base64 = require('base-64');
var constant = require('./../../static/constant');
import CallButton from './CallButton';
import ChatSquare from './ChatSquare';
import PropFriendMessage from './PropFriendMessage';
import PropMessageChat from './PropMessageChat';
import VideoCallButton from './VideoCallButton';
// var myInfo = {
//     id : "12321312312",
//     name : "Lê Văn Thành"
// }
// var friendMassage = [
//     {
//         id : "12321312311",
//         friend : {
//             id : "1232131",
//             name : "Lê Duy Đạt",
//             avatar : {
//                 imgSmall : "./static/Atommm.jpg",
//                 imgBig : ""
//             },
//         },
//         lastMassage : "ê mày! Nhớ tao không ?",
//         lastTime : "12/10/2018"
//     },
//     {
//         id : "12321312312",
//         friend : {
//             id : "1232131",
//             name : "Lê Văn Thành",
//             avatar : {
//                 imgSmall : "./static/Atommk.jpg",
//                 imgBig : ""
//             },
//         },
//         lastMassage : "Nhớ cmm ",
//         lastTime : "12/10/2018"
//     },
//     {
//         id : "12321312313",
//         friend : {
//             id : "1232131",
//             name : "Phan Thanh Liêm",
//             avatar : {
//                 imgSmall : "./static/Atomyk.jpg",
//                 imgBig : ""
//             },
//         },
//         lastMassage : "cc ",
//         lastTime : "12/10/2018"
//     }
// ]

// var chat_message = [
//     { id : "12321312312", text : "mai đi nhậu không ?" },
//     { id : "12321312313", text : "tao ốm rồi" },
//     { id : "12321312312", text : "ốm cc" },
//     { id : "12321312312", text : "suốt ngày bệnh" },
//     { id : "12321312313", text : "cmm" },
// ]


// test function
function findNamebyId(id) {
    var findName = friendMassage.find((e) => {
        return e.id == id;
    })
    console.log(findName);
    return findName.friend;
}
export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendMessage: [],
            idClient: '',
            isloadData: false
        }
    }
    getToken() {
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }
    async componentDidMount() {
        if (this.state.isloadData == false) {
            var token = await this.getToken();
            // var clientInfo;
            // const fetchInfo = await fetch(constant.server + '/info', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({token : token})
            // });
            // clientInfo = await fetchInfo.json();
            //     var friendMessage = [];
            // this.setState({isloadData : true});
            const fetchFriend = await fetch(constant.server + '/message/friend', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }).then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    console.log(json.id);

                    this.setState({
                        friendMessage: [...json.friend],
                        idClient: json.id,
                        isloadData: true
                    });

                })
        }
    }
    render() {
        if (this.state.isloadData === false) return false;
        else {
            console.log(this.state.friendMessage);
            // var ChatSquareClone = React.cloneElement(<ChatSquare/>, {token: this.getToken()})
            return (
                <BrowserRouter>
                    <div className="message-container">
                        <div className="friend-massage-container">
                            {this.state.friendMessage.map(e => {
                                return <PropFriendMessage {...e} key={e._id} />
                            }
                            )}
                        </div>
                        {/* <Route pathname="/message" component={ChatSquare} /> */}
                    </div>
                </BrowserRouter>
            )   
        }
    }
}