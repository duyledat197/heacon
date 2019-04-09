import Link from 'next/link'
import React, { PureComponent } from 'react'
import './FriendMessageBox.scss'
export default class FriendMessageBox extends PureComponent {
  getDayOfWeek = (num) => {
    const getDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return getDayOfWeek[num]
  }
  render() {
    const selected = this.props.selected?true:false;
    var dateTimeOffset = new Date(this.props.lastTime);
    console.log(dateTimeOffset);
    console.log(dateTimeOffset.getDay().toString());
    var link = <Link href={"/message/" + this.props.id}></Link>
    var friendMessageBoxElement =
      <div className={"friend-message-box"+(selected?" selected":"")}>
        <img
          className="friend-message-box__avatar"
          src="https://res.cloudinary.com/levanthanh-ptit/image/upload/v1531941390/sample.jpg"
        />
        <div className="friend-message-box__info">
          <span className="friend-message-box__info__name"> {this.props.name}</span>
          <span className="friend-message-box__info__lastMessage"> {this.props.lastMessage}</span>
          <span className="friend-message-box__info__lastTime">
            <abbr title={dateTimeOffset.getDate() + '/' + dateTimeOffset.getMonth() + '/' + dateTimeOffset.getFullYear()}>
              {this.getDayOfWeek(dateTimeOffset.getDay())}
            </abbr>
          </span>
        </div>
      </div>
    if(selected) 
    return (
      friendMessageBoxElement
    )
    else return(
      React.cloneElement(link,null,friendMessageBoxElement)      
    )
  }
}
