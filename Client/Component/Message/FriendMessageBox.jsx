import Link from 'next/link'
import React, { Component } from 'react'
import './FriendMessageBox.scss'
export default class FriendMessageBox extends Component {
  constructor(props) {
    super(props)
    this.handleRedirect = this.handleRedirect.bind(this)
  };

  getDayOfWeek = (num) => {
    const getDayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return getDayOfWeek[num]
  }
  handleClick = (e) => {
    e.preventDefault();
    router.push(e.target.href)
  }
  handleRedirect() {
    this.props.handleRedirect(this.props.id)
  }
  render() {
    const selected = this.props.selected ? true : false;
    var dateTimeOffset = new Date(this.props.lastTime);
    var friendMessageBoxElement = <div className={"friend-message-box" + (selected ? " selected" : "")}
      onClick={selected ? null : () => this.handleRedirect()}
    >
      <div className="friend-message-box__avatar">
        {
          this.props.avatar?(
            null
          ):(
            <i className='fas fa-user-circle'/>
          )
        }
      </div>
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
    return (
      friendMessageBoxElement
    )
  }
}
