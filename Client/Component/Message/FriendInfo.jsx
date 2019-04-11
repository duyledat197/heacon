import React, { Component } from 'react'
import './FriendInfo.scss'
export default class FriendInfo extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='friendInforHeader'>
          <div className='friendInforHeader__avatar'></div>
          <div className='friendInforHeader__detail'>
            <div className='friendInforHeader__detail__name'>Your name</div>
            <div className='friendInforHeader__detail__status'>fuking die</div>
          </div>
          <div className='friendInforHeader__setting-button'>
            <i className="fas fa-cog"></i>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
