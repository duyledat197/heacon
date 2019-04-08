import  Link  from 'next/link'
import React, { PureComponent } from 'react'
export default class FriendMessageBox extends PureComponent {
  render() {
    return (
        <Link href={"/message/"+this.props.id}>
        <div className="friend-massage-square">
            <div className="friend-massage-avatar-info">
                <img src="https://res.cloudinary.com/levanthanh-ptit/image/upload/v1531941390/sample.jpg" className="friend-message-avatar" />
                <div className="friend-massage-info">
                    <div className="friend-massage-name"> {this.props.name}</div>
                    <div className="friend-massage-lastMassage"> {this.props.lastMessage}</div>
                    <div className="friend-massage-lastTime"> {this.props.lastTime}</div>
                </div>
            </div>
        </div>
    </Link>
    )
  }
}
