import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import './ChatSquare.scss'
import ChatBubble from './ChatBubble';
import CallButton from './CallButton';
import VideoCallButton from './VideoCallButton';
var base64 = require('base-64');
import axios from 'axios';
import constant from '../../static/constant'

export default class ChatSquare extends Component {
    constructor(props) {
        super(props)
        this.fakeCode = this.fakeCode.bind(this);
        this.getTokenfromlocalStorage = this.getTokenfromlocalStorage.bind(this);
        this.commitMessage = this.commitMessage.bind(this);
        this.state = {
            idFriend: null,
            token: null,
            chat_message: null,
        }
    }
    fakeCode(id, token) {
        return [
            { id: id, text: "mai đi nhậu không ?" },
            { id: 1, text: "tao ốm rồi" },
            { id: id, text: "ốm cc" },
            { id: id, text: "suốt ngày bệnh" },
            { id: 1, text: "cmm" },
        ]
    }
    getTokenfromlocalStorage() {
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }
    connectSocket() {
        return socket = openSocket(constant.server);
    }
    sendMessage() {

    }
    commitMessage() {
        var text = document.getElementById('aaaaaaaaaaaaaaaaaaa');  
        const id = new Date().getMilliseconds();
        var chat_message = this.state.chat_message;
        chat_message.push({ id: 1, text: text.nodeValue })
        this.setState({
            chat_message: chat_message
        })
    }
    async componentDidMount() {
        let idFriend = this.props.idFriend;
        const token = this.getTokenfromlocalStorage();
        await this.setState({
            idFriend: idFriend,
            chat_message: this.fakeCode(idFriend, token)
        })
    }
    // async componentDidMount() {
    //     let idFriend = this.props.idFriend;
    //     const token = this.getTokenfromlocalStorage();
    //     // this.setState({
    //     //     chat_message: this.fakeCode(idFriend, token)
    //     // })
    //     // await axios.post(constant.server+ "/message", { token: token, idfriend: idFriend }).then(resp => {
    //     //     chat_message = resp.data;
    //     //     console.log(chat_message);
    //     //     // this.setState({
    //     //     //     chat_message: chat_message,
    //     //     //     idfriend: idFriend,
    //     //     // })
    //     // })
    //     var socket = await this.connectSocket();
    //     // await axios.post( constant.server + '/info', {
    //     //     token : token
    //     // }).then(resp => {
    //     //     console.log(resp.data);
    //     //     info = resp.data;

    //     // })
    // }
    render() {
        return (
            <div className="chat-square">
                <div className="chat-square__header">
                    <div className='chat-square__header__title'>
                        Your friend name
                    </div>
                    <CallButton className='chat-square__header__button'>
                        <i className="fas fa-phone"></i>
                    </CallButton>
                    <VideoCallButton className='chat-square__header__button'>
                        <i className="fas fa-video"></i>
                    </VideoCallButton>
                </div>
                <div className='chat-square__body'>
                    <div className='chat-square__body__chat-box'>
                        <div className="chat-square__body__chat-box__bubble-list">
                            {this.state.chat_message == null ? null : this.state.chat_message.map(e => (
                                <ChatBubble {...e} key={this.state.chat_message.indexOf(e)} idFriend={this.state.idFriend} />
                            ))}
                        </div>
                        <div className="chat-square__body__chat-box__chat-input-box">
                            <input id='aaaaaaaaaaaaaaaaaaa'
                                className='chat-square__body__chat-box__chat-input-box__input'

                            />
                            <div className='chat-square__body__chat-box__chat-input-box__button'
                                onClick={() => this.commitMessage()}
                            >
                                <img src="../../static/icon_send.png"></img>
                            </div>
                        </div>
                    </div>
                    <div className='chat-square__body__infomation'>

                    </div>
                </div>
            </div>
        )
    }
}
