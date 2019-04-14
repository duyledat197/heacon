import React, { Component } from 'react'
import './FriendInfo.scss'
export default class FriendInfo extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='friendInfoHeader'>
          <div className='friendInfoHeader__avatar'></div>
          <div className='friendInfoHeader__detail'>
            <div className='friendInfoHeader__detail__name'>Your name</div>
            <div className='friendInfoHeader__detail__status'>fuking die</div>
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
