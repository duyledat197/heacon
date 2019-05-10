import React, { Component } from 'react'
import UserInfoComponent from '../Component/UserInfo/UserInfo'
import './userinfo.scss'

class UserInfo extends Component {
    render () {
        return (
            <div className="userinfo-main-container">
                <UserInfoComponent/>
            </div>
        )
    }
}

export default UserInfo