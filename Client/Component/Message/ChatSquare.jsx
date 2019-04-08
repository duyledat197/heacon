import React, { Component } from 'react';
import './ChatSquare.scss'
import ChatBubble from './ChatBubble';
import CallButton from './CallButton';
import VideoCallButton from './VideoCallButton';
var base64 = require('base-64');
import axios from 'axios';
import constant from '../../static/constant'

export default class ChatSquare extends Component {
    state={

    }
    getTokenfromlocalStorage() {
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }

    async componentDidMount() {
        let param = this.props.id;
        const token = this.getTokenfromlocalStorage();
        // await axios.post(constant.server+ "/message", { token: token, idfriend: param }).then(resp => {
        //     chat_message = resp.data;
        //     console.log(chat_message);
        //     // this.setState({
        //     //     chat_message: chat_message,
        //     //     params
        //     // })
        // })
    }
    render() {
        // return false
        // console.log(this.state.chat_message);
        
        return (
            <div className="chat-friend-online-container">
                <div className="chat-container">
                    <div className="chat-container-name">Tên Cuộc Trò Chuyện</div>
                    <div className="chat-container-content">
                        {this.state.chat_message==null?null:this.state.chat_message.map(e => (
                            <ChatBubble {...e} />
                        ))}
                    </div>
                    <div className="chat-container-text-input">
                        <div className="chat-container-text-input-left">
                            <div className="chat-container-text-input-left-buff">
                                <input className="chat-container-text-input-input" />
                            </div>
                            <div className="chat-container-text-input-left-buff-button">
                                <button className="chat-container-text-input-button"> <img src="./static/icon_send.png" /> </button>
                            </div>
                        </div>
                        <div className="chat-container-text-input-right">
                            <CallButton />
                            <VideoCallButton />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
