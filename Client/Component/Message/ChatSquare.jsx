import React, { Component } from 'react';
import './ChatSquare.scss'
import ChatBubble from './ChatBubble';
import CallButton from './CallButton';
import VideoCallButton from './VideoCallButton';
var base64 = require('base-64');
import axios from 'axios';
import constant from '../../static/constant'

export default class ChatSquare extends Component {
    state = {

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
                                <ChatBubble {...e} />
                            ))}
                        </div>
                        <div className="chat-square__body__chat-box__chat-input-box">
                            <input className='chat-square__body__chat-box__chat-input-box__input'

                            />
                            <div className='chat-square__body__chat-box__chat-input-box__button'></div>
                        </div>
                    </div>
                    <div className='chat-square__body__infomation'>
                                
                    </div>
                </div>
            </div>
        )
    }
}
