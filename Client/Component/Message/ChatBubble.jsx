//bubble chat message
import React, { PureComponent } from 'react'
import './ChatBubble.scss'
export default class ChatBubble extends PureComponent {
  render() {
    let fromOther = this.props.id === this.props.idFriend;
    return (
      <div className={"ChatBubble" + (fromOther ? " left" : " right")}>
        {fromOther && <div className='ChatBubble__avatar'></div>}
        <div className={"ChatBubble__box" + (fromOther ? " left" : " right")}>
          {this.props.text}
        </div>
      </div>
    )
  }
}

