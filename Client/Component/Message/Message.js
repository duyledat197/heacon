import React, { Component } from 'react';
import './Message.scss';
import { withRouter } from 'next/router'
import ChatSquare from './ChatSquare';
import FriendMessageBox from './FriendMessageBox';
var base64 = require('base-64');
var constant = require('./../../static/constant');

class Message extends Component {
    constructor(props) {
        super(props)
        this.handleRedirect = this.handleRedirect.bind(this);
        this.state = {
            friendMessage: [],
            myId: '',
            isloadData: false,
            selectedBoxId: null,
            friendAvatarUrl: '',
        }
    }

    getToken() {
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }
    handleRedirect(id) {
        this.setState({
            selectedBoxId: id
        })
        this.props.handleChangeRootId(id);
    }

    async componentDidMount() {
        if (this.state.isloadData == false) {
            var token = await this.getToken();

            const fetchFriend = await fetch(constant.server + '/message/friends', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            }).then(resp => resp.json())
                .then(json => {
                    if (this.props.idFriend === undefined) location.replace("/message/" + json.friend[0].id)
                    console.log(json);
                    this.setState({
                        friendMessage: [...json.friend],
                        myId: json.id,
                        isloadData: true,
                        selectedBoxId: this.props.idFriend
                    });
                })
        }
    }
    render() {
        this.refs
        var FriendListElement = this.state.friendMessage.map(e => {
            return <FriendMessageBox {...e}
                key={e._id}
                selected={this.state.selectedBoxId === e.id}
                handleRedirect={this.handleRedirect}
            />
        }
        )
        var chat_square_idFriend = null;
        if (this.props.idFriend !== undefined)
            chat_square_idFriend = this.props.idFriend
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
                        <ChatSquare idFriend={chat_square_idFriend} router={this.props.router} myId ={this.state.myId}/>
                    </div>
                </div>
            )
        }
    }
}
export default withRouter(Message)