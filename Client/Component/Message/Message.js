import React, { Component } from 'react';
import './Message.scss';
import { withRouter } from 'next/router'
import ChatSquare from './ChatSquare';
import FriendMessageBox from './FriendMessageBox';
var base64 = require('base-64');
var constant = require('./../../static/constant');
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

// test function
function findNamebyId(id) {
    var findName = friendMassage.find((e) => {
        return e.id == id;
    })
    console.log(findName);
    return findName.friend;
}
class Message extends Component {
    constructor(props) {
      super(props)
        this.handleRedirect = this.handleRedirect.bind(this);
      this.state = {
        friendMessage: [],
        idClient: '',
        isloadData: false,
        SelectedBoxId: null,
      }
    }
    
    getToken() {
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }
    handleRedirect(id) {
        this.setState({
            SelectedBoxId: id
        })
        this.props.handleChangeRootId(id);
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
                    if (this.props.id === undefined) location.replace("/message/" + json.friend[0].id)
                    this.setState({
                        friendMessage: [...json.friend],
                        idClient: json.id,
                        isloadData: true,
                        SelectedBoxId: this.props.id
                    });
                })
        }
    }
    render() {
        this.refs
        var FriendListElement = this.state.friendMessage.map(e => {
            return <FriendMessageBox {...e}
                key={e._id}
                selected={this.state.SelectedBoxId === e.id}
                handleRedirect={this.handleRedirect}
            />
        }
        )

        if (this.state.isloadData === false) return false;
        else {
            return (
                <div className="message-container">
                    <div className="friend-massage-container">
                        <div className='friend-massage-container__header'>
                            <div className='friend-massage-container__header__title'>
                                Friend list
                            </div>
                        </div>
                        <div className='friend-massage-container__friend-list'>
                            {FriendListElement}
                        </div>

                    </div>
                    <div className="chat-square-container">
                        <ChatSquare idFriend={this.props.id} router={this.props.router} />
                    </div>

                </div>
            )
        }
    }
}
export default withRouter(Message)