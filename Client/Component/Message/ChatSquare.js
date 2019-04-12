import React, { Component } from 'react';
import openSocket from 'socket.io-client';
var base64 = require('base-64');
import axios from 'axios';
import constant from '../../static/constant'
import './ChatSquare.scss'
import ChatBubble from './ChatBubble';
import CallButton from './CallButton';
import VideoCallButton from './VideoCallButton';
import FriendInfo from './FriendInfo';

export default class ChatSquare extends Component {
    constructor(props) {
        super(props)
        this.fakeCode = this.fakeCode.bind(this);
        this.getTokenfromlocalStorage = this.getTokenfromlocalStorage.bind(this);
        this.commitMessage = this.commitMessage.bind(this);
        this.handleTextInputBoxOnChange = this.handleTextInputBoxOnChange.bind(this);
        this.handleKeyEnterPress = this.handleKeyEnterPress.bind(this);
        this.state = {
            idFriend: null,
            token: null,
            chat_message: null,
            chatInputBoxText: '',
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
    handleTextInputBoxOnChange(e) {
        this.setState({
            chatInputBoxText: e.target.value
        })
    }
    async commitMessage() {
        var text_input = document.getElementById('chat-input-box-id');
        var text = text_input.value
        if (text === '') {
            return
        }
        const id = new Date().getMilliseconds();
        /***call API and add to state***/
        var chat_message = this.state.chat_message;
        chat_message.push({ id: 1, text: text })
        await this.setState({
            chat_message: chat_message,
            chatInputBoxText: ''
        })
        text_input.focus();
        /***then scroll to bottom***/
        await this.scrollBottom('bubble-list-id')
    }
    scrollBottom(elementId) {
        var element = document.getElementById(elementId);
            element.scrollTop = element.scrollHeight - element.clientHeight;
    }

    handleKeyEnterPress(e) {
        if (e.key === 'Enter') {
            this.commitMessage();
        }
    }

    async componentDidMount() {
        console.log('component did mount');
        
        let idFriend = this.props.idFriend;
        const token = this.getTokenfromlocalStorage();
        await this.setState({
            idFriend: idFriend,
            chat_message: this.fakeCode(idFriend, token)
        })
    }
    componentDidUpdate(){
        console.log('component update');

    }
    componentWillUnmount() {
        console.log('component will unmount');

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
                        <div
                            id='bubble-list-id'
                            className="chat-square__body__chat-box__bubble-list"
                        >
                            {this.state.chat_message == null ? null : this.state.chat_message.map(e => (
                                <ChatBubble {...e} key={this.state.chat_message.indexOf(e)} idFriend={this.state.idFriend} />
                            ))}
                        </div>
                        <div className="chat-square__body__chat-box__chat-input-box">

                            <input id='chat-input-box-id'
                                className='chat-square__body__chat-box__chat-input-box__input'
                                type='text'
                                placeholder='Aa'
                                value={this.state.chatInputBoxText}
                                onChange={e => this.handleTextInputBoxOnChange(e)}
                                onKeyPress={(e) => this.handleKeyEnterPress(e)}
                            />
                            <div className='chat-square__body__chat-box__chat-input-box__button'
                                onClick={() => this.commitMessage()}
                            >
                                <img src="../../static/icon_send.png"></img>
                            </div>
                        </div>
                    </div>
                    <div className='chat-square__body__infomation'>
                        <FriendInfo/>
                    </div>
                </div>
            </div>
        )
    }
}
