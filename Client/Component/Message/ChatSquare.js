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

var socket;

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
    fakeCode(idFriend, myId) {
        return [
            { id: idFriend, text: "mai đi nhậu không ?" },
            { id: myId, text: "tao ốm rồi" },
            { id: idFriend, text: "ốm cc" },
            { id: idFriend, text: "suốt ngày bệnh" },
            { id: idFriend, text: "cmmmmmm mmmmm mmmmmmm a mmmmmmm mmmmmmmmmmm mmmmmm a mmmmmmm mmmmmmmmmmmmmm a mmmmmmm mmmmmmmmmmmmmm a mmmmmmm mmmmmmmmmmmmmm a mmmmmmm mmmmmmmmmmmmm mmmmmmmmmmm" },
        ]
    }
    fetchMessage(id) {

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
        var elements = loadedChat.indexOf(loadedChat.find(e => { return e.idFriend === idFriend }));
        return elements
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
    async onReceiveMessage(idFriend, text) {
        var bubbleList = document.getElementById('bubble-list-id');
        const bubbleListIsBottom = (bubbleList.scrollTop == (bubbleList.scrollHeight - bubbleList.clientHeight));
        /*** add to state ***/
        await this.pushMessage(text, idFriend)
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
        const bubbleListIsBottom = (bubbleList.scrollTop == (bubbleList.scrollHeight - bubbleList.clientHeight));
        /*** call API to emit message ***/
        await this.emitMessageToSocket(this.state.idFriend, text)
        /*** add to state ***/
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
        let idFriend = this.props.idFriend;
        const token = this.getTokenfromlocalStorage();
        await this.setState({
            componentDidMount: true,
            LoadedChat: [
                {
                    idFriend: idFriend,
                    chat_message: this.fakeCode(idFriend, this.props.myId),
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
        var loadedChat = this.state.LoadedChat;
        var elements = loadedChat[this.findLoadedChatIndex(idFriend)].chat_message.map(e => {
            return <ChatBubble
                {...e}
                idFriend={idFriend}
                key={loadedChat[this.findLoadedChatIndex(idFriend)].chat_message.indexOf(e)}
            />
        })
        return elements;
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
