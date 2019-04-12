import React, { Component } from 'react'
import LoginComponent from '../Component/Login/Login'
import './login.scss'
class Login extends Component {
    render () {
        return (
            <div className="login-main-container">
                <LoginComponent/>
            </div>
        )
    }
}

export default Login