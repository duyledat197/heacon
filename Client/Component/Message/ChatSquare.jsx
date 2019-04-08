import React, { Component } from 'react';
import PropMessageChat from './PropMessageChat';
import CallButton from './CallButton';
import VideoCallButton from './VideoCallButton';

export default class ChatSquare extends Component {

    componentDidMount() {
        let params = new URLSearchParams(this.props.location.search);
        console.log("?????" + params);

        var chat_message;
        // await axios.post(constant.server, { token: this.props.token, idfriend: params.get("id") }).then(resp => {
        //     chat_message = resp.data;
        //     console.log(chat_message);
        //     this.setState({
        //         chat_message: chat_message,
        //         params
        //     })
        // })

    }
    render() {
        return false
        // return (
        //     <div className="chat-friend-online-container">
        //         <div className="chat-container">
        //             <div className="chat-container-name">Tên Cuộc Trò Chuyện</div>
        //             <div className="chat-container-content">
        //                 {this.state.chat_message.map(e => (
        //                     <PropMessageChat {...e} />
        //                 ))}
        //             </div>
        //             <div className="chat-container-text-input">
        //                 <div className="chat-container-text-input-left">
        //                     <div className="chat-container-text-input-left-buff">
        //                         <input className="chat-container-text-input-input" />
        //                     </div>
        //                     <div className="chat-container-text-input-left-buff-button">
        //                         <button className="chat-container-text-input-button"> <img src="./static/icon_send.png" /> </button>
        //                     </div>
        //                 </div>
        //                 <div className="chat-container-text-input-right">
        //                     <CallButton />
        //                     <VideoCallButton />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // )
    }
}
