import React, { Component } from 'react';
import PropTypes from 'prop-types'
import openSocket from 'socket.io-client';
var base64 = require('base-64');
import axios from 'axios';
import constant from '../../static/constant'
import './ChatSquare.scss'
import ChatBubble from './ChatBubble';
import CallButton from './CallButton';
import VideoCallButton from './VideoCallButton';
import FriendInfo from './FriendInfo';
import { isNullOrUndefined } from 'util';

export default class ChatSquare extends Component {
    constructor(props) {
        super(props)
        this.fakeCode = this.fakeCode.bind(this);
        this.getTokenfromlocalStorage = this.getTokenfromlocalStorage.bind(this);
        this.commitMessage = this.commitMessage.bind(this);
        this.handleTextInputBoxOnChange = this.handleTextInputBoxOnChange.bind(this);
        this.handleKeyEnterPress = this.handleKeyEnterPress.bind(this);
        this.findLoadedChatIndex = this.findLoadedChatIndex.bind(this);
        this._render_bubble = this._render_bubble.bind(this);
        this.addNewLoadedChat = this.addNewLoadedChat.bind(this);
    }
    state = {
        idFriend: this.props.idFriend,
        componentDidMount: false,
        LoadedChat: [
            // {
            //     idFriend,
            //     chat_message:[
            //         id,
            //         text,
            //     ]
            // }
        ],
    }
    static propTypes = {
        idFriend: PropTypes.string,
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
    // call API method
    sendMessage() {

    }
    findLoadedChatIndex(idFriend) {
        var loadedChat = this.state.LoadedChat;
        var x = loadedChat.indexOf(loadedChat.find(e => { return e.idFriend === idFriend }));
        return x
    }
    addNewLoadedChat(idFriend) {
        this.setState({
            idFriend: idFriend,
            LoadedChat: [...this.state.LoadedChat, { idFriend: idFriend, chat_message: [] }]
        })
    }
    handleTextInputBoxOnChange(e) {
        this.setState({
            chatInputBoxText: e.target.value
        })
    }
    // require idFriend for unasync state change
    pushMessage(mess, idFriend) {
        var loaded = this.state.LoadedChat
        let index = loaded.indexOf(loaded.find(e => {
            return e.idFriend === idFriend
        }))
        loaded[index].chat_message.push({
            id: this.props.myId,
            text: mess,
        })
        this.setState({
            LoadedChat: loaded,
        })
    }
    async commitMessage() {
        var text_input = document.getElementById('chat-input-box-id');
        var text = text_input.value
        if (text === '') {
            return
        }
        var bubbleList = document.getElementById('bubble-list-id');
        const bubbleListIsBottom = (bubbleList.scrollTop == (bubbleList.scrollHeight - bubbleList.clientHeight));
        const id = new Date().getMilliseconds();
        /***call API and add to state***/
        await this.pushMessage(text, this.state.idFriend)
        text_input.value = '';
        text_input.focus();
        /***then scroll to bottom***/
        if (bubbleListIsBottom)
            await this.scrollBottom('bubble-list-id')
    }
    scrollBottom(elementId) {
        var element = document.getElementById(elementId);
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
    scrollTo(scroll_value) {
        var element = document.getElementById('bubble-list-id');
        element.scrollTop = scroll_value;
    }
    clearInput(elementId){
        var element = document.getElementById(elementId);
        element.value = ''
    }
    handleKeyEnterPress(e) {
        if (e.key === 'Enter') {
            this.commitMessage();
        }
    }

    async componentDidMount() {
        console.log('com did mount');

        let idFriend = this.props.idFriend;
        const token = this.getTokenfromlocalStorage();
        await this.setState({
            componentDidMount: true,
            LoadedChat: [
                {
                    idFriend: idFriend,      
                    chat_message: [],
                }
            ]
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log('com did update');
        if (prevProps.idFriend !== this.props.idFriend) {
            var new_idFriend = this.props.idFriend;
            if (this.findLoadedChatIndex(new_idFriend) == -1) {
                await this.addNewLoadedChat(this.props.idFriend)
            } else {
                await this.setState({
                    idFriend: this.props.idFriend,
                })
                await this.scrollBottom('bubble-list-id')
            }
            await this.clearInput('chat-input-box-id')

        }
    }
    componentWillUnmount() {
        console.log('com unmount');
    }
    _render_bubble(idFriend) {
        var x = this.state.LoadedChat[this.findLoadedChatIndex(idFriend)].chat_message.map( e =>{
          return  <ChatBubble {...e}  idFriend={idFriend} />
        })
        return x;
    }
    render() {
         var chat_bubble_list = null
         if(this.state.componentDidMount){
             chat_bubble_list = this._render_bubble(this.state.idFriend);
         } 
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
                            {chat_bubble_list}
                        </div>
                        <div className="chat-square__body__chat-box__chat-input-box">

                            <input id='chat-input-box-id'
                                className='chat-square__body__chat-box__chat-input-box__input'
                                type='text'
                                placeholder='Aa'
                                autoComplete='off'
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
                        <FriendInfo />
                    </div>
                </div>
            </div>
        )
    }
}
