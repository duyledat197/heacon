//bubble chat message
import React, { PureComponent } from 'react'

export default class ChatBubble extends PureComponent {
  render() {
    return (
        <div className={this.props.id == myInfo.id ? "bubble-chat-right" : "bubble-chat-left"}>
            <img
                // src={findNamebyId(this.props.id).avatar.imgSmall} 
                className={this.props.id == myInfo.id ? "display-none" : "friend-message-avatar"} />
            <div className="bubble-wrap">
                <div className={this.props.id == myInfo.id ? "display-none" : "bubble-chat-name"}>
                    {/* {findNamebyId(this.props.id).name} */}
                </div>
                <div className={this.props.id == myInfo.id ? "bubble-chat-content-right" : "bubble-chat-content-left"}>
                    {this.props.text}
                </div>
            </div>
        </div>
    )
  }
}

