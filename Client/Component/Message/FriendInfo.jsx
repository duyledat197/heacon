import React, { Component } from 'react'
import './FriendInfo.scss'
export default class FriendInfo extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='friendInfoHeader'>
          <div className='friendInfoHeader__avatar'>
            {this.props.FriendAvatar?(
              null
            ):(
              null
            )}
          </div>
          <div className='friendInfoHeader__detail'>
            <div className='friendInfoHeader__detail__name'>{this.props.friendName}</div>
            <div className='friendInfoHeader__detail__status'>{this.props.idFriend}</div>
          </div>
          <div className='friendInfoHeader__setting-button'>
            <i className="fas fa-cog"></i>
          </div>
        </div>
        <div >
          
        </div>
      </React.Fragment>
    )
  }
}
