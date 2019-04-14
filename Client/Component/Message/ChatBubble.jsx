//bubble chat message
import React, { PureComponent } from 'react'
import './ChatBubble.scss'
export default class ChatBubble extends PureComponent {
  render() {
      const idFriend = this.props.idFriend;
      const id = this.props.id;
      var fromOther = idFriend===id;
    return (
        <div className={"ChatBubble"+(fromOther?" left":" right")}>
            {fromOther&&<div className='ChatBubble__avatar'></div>}
            <div className={"ChatBubble__box"+(fromOther?" left":" right")}>
                {this.props.text}
            </div>
        </div>
    )
  }
}

