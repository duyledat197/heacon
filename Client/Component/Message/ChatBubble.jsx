//bubble chat message
import React, { PureComponent } from 'react'
import './ChatBubble.scss'
export default class ChatBubble extends PureComponent {
  render() {
      const idFriend = this.props.idFriend;
      const id = this.props.id;
    return (
        <div className={"ChatBubble"+(idFriend===id?" left":" right")}>
            <div className={"ChatBubble__box"+(idFriend===id?" left":" right")}>
                {this.props.text}
            </div>
        </div>
    )
  }
}

