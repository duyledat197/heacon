import React, { Component } from 'react';
import PropTypes from 'prop-types'
import openSocket from 'socket.io-client';
var base64 = require('base-64');
import constant from '../../static/constant'
import './ChatSquare.scss'
import ChatBubble from './ChatBubble';
import CallButton from './CallButton';
import VideoCallButton from './VideoCallButton';
import FriendInfo from './FriendInfo';
import axios from 'axios';
var socket;

export default class ChatSquare extends Component {
    constructor(props) {
        super(props)
        this.loadChatMessages = this.loadChatMessages.bind(this);
        this.getTokenfromlocalStorage = this.getTokenfromlocalStorage.bind(this);
        this.commitMessage = this.commitMessage.bind(this);
        this.handleTextInputBoxOnChange = this.handleTextInputBoxOnChange.bind(this);
        this.handleKeyEnterPress = this.handleKeyEnterPress.bind(this);
        this.findLoadedChatIndex = this.findLoadedChatIndex.bind(this);
        this._render_bubble = this._render_bubble.bind(this);
        this.addNewLoadedChat = this.addNewLoadedChat.bind(this);
        this.emitMessageToSocket - this.emitMessageToSocket.bind(this);
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
    async loadChatMessages(idFriend) {
        console.log(idFriend);
        let messages;
        if (idFriend == null) return []
        else {
            await axios.post(constant.server + "/message/load", {
                token: this.getTokenfromlocalStorage(),
                idFriend: idFriend
            }).then(
                res => {
                    console.log(res.data);
                    messages = res.data
                }
            ).catch(
                error => {
                    console.log(error);
                }
            )
        }
        return messages

    }

    getTokenfromlocalStorage() {
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }
    connectSocket() {
        return socket = openSocket(constant.server);
    }

    findLoadedChatIndex(idFriend, loadedChat) {
        return loadedChat.indexOf(loadedChat.find(e => { return e.idFriend === idFriend }));
    }
    async addNewLoadedChat(idFriend) {
        await this.setState({
            idFriend: idFriend,
            LoadedChat: [...this.state.LoadedChat, { idFriend: idFriend, chat_message: [] }]
        })
    }
    handleTextInputBoxOnChange(e) {
        this.setState({
            chatInputBoxText: e.target.value
        })
    }
    emitMessageToSocket(idFriend, text) {
        try {
            socket.emit('CLIENT_SEND_MESSAGE', {
                token: this.getTokenfromlocalStorage(),
                message: {
                    idFriend,
                    text,
                }
            })
        } catch (error) {
            alert(error)
        }

    }
    // require idFriend for unasync state change
    pushMessage(id, mess, date, idFriend) {
        var loaded = this.state.LoadedChat
        let index = loaded.indexOf(loaded.find(e => {
            return e.idFriend === idFriend
        }))
        loaded[index].chat_message.push({
            id: id,
            text: mess,
            date: date,
        })
        this.setState({
            LoadedChat: loaded,
        })
    }
    async onReceiveMessage(data) {
        console.log(data);
        let id = data.id;
        let text = data.text;
        let date = data.date;
        let idFriend;
        if (data.id == this.props.myId || data.id == this.state.idFriend) {
            idFriend = this.state.idFriend;
        }
        else {
            idFriend = id
        }        
        var bubbleList = await document.getElementById('bubble-list-id');
        const bubbleListIsBottom = (bubbleList.scrollTop == (bubbleList.scrollHeight - bubbleList.clientHeight));
        /*** add to state ***/
        await this.pushMessage(id, text, date, idFriend)
        /***then scroll to bottom***/
        if (bubbleListIsBottom)
            await this.scrollBottom('bubble-list-id')
    }
    async commitMessage() {
        var text_input = document.getElementById('chat-input-box-id');
        var text = text_input.value
        if (text === '') {
            return
        }
        var bubbleList = document.getElementById('bubble-list-id');
        /*** call API to emit message ***/
        await this.emitMessageToSocket(this.state.idFriend, text)
        /*** add to state ***/
        text_input.value = '';
        text_input.focus();
    }
    scrollBottom(elementId) {
        var element = document.getElementById(elementId);
        element.scrollTop = element.scrollHeight - element.clientHeight;
    }
    scrollTo(scroll_value) {
        var element = document.getElementById('bubble-list-id');
        element.scrollTop = scroll_value;
    }
    clearInput(elementId) {
        var element = document.getElementById(elementId);
        element.value = ''
    }
    handleKeyEnterPress(e) {
        if (e.key === 'Enter') {
            this.commitMessage();
        }
    }

    async componentDidMount() {
        let idFriend = await this.props.idFriend;
        const token = await this.getTokenfromlocalStorage();
        let loadChatMessages = await this.loadChatMessages(idFriend);
        await console.log(idFriend);
        await console.log(loadChatMessages);
        await this.setState({
            componentDidMount: true,
            LoadedChat: [
                {
                    idFriend: idFriend,
                    chat_message: loadChatMessages,
                }
            ]
        });
        // connect soket
        socket = openSocket(constant.server);
        socket.emit('CLIENT_CONNECT_MESSAGE', { token });
        socket.on('SEND_MESSAGE_TO_CLIENT', data => this.onReceiveMessage(data))
    }

    async componentDidUpdate(prevProps, prevState) {
        console.log('com did update');
        if (prevProps.idFriend !== this.props.idFriend) {
            let new_idFriend = this.props.idFriend;
            if (this.findLoadedChatIndex(new_idFriend, this.state.LoadedChat) == -1) {
                await this.addNewLoadedChat(new_idFriend);
                let LoadedChat = await this.loadChatMessages(new_idFriend);
                await this.setState({
                    idFriend: new_idFriend,
                    LoadedChat: LoadedChat,
                })
            } else {
                await this.setState({
                    idFriend: new_idFriend,
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
        let loadedChat = this.state.LoadedChat;
        if (loadedChat[this.findLoadedChatIndex(idFriend, loadedChat)].chat_message == undefined) return null;
        return loadedChat[this.findLoadedChatIndex(idFriend, loadedChat)].chat_message.map(function (e) {
            return <ChatBubble
                key={e.id}
                idFriend={idFriend}
                id={e.id}
                text={e.text}
                date={e.date}
            />
        })
    }
    render() {
        var chat_bubble_list = null
        if (this.state.componentDidMount) {
            chat_bubble_list = this._render_bubble(this.state.idFriend);
        }
        return (
            <div className="chat-square">
                <div className="chat-square__header">
                    <div className='chat-square__header__title'>
                        {this.props.friendName}
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
                        <FriendInfo idFriend={this.props.idFriend} friendName={this.props.friendName}/>
                    </div>
                </div>
            </div>
        )
    }
}
