import React, { Component } from 'react'
import './Login.scss'
import BackGround from './../BackGround/BackGround'
var base64 = require('base-64');


import axios from 'axios'
class LogInComponent extends Component {
    handleClickLogin(e){
        let userName = document.getElementById('login-id').value;
        let password = document.getElementById('login-password').value;
        axios.post('http://localhost:3000/login',{
            userName,
            password
        }).then((resp) => {
            var encodedData = base64.encode(resp.data.token);
            localStorage.setItem("token", encodedData);
            location.replace('/message/' + encodedData);
            
        }).catch((err) => {
            alert(err.toString());
        });   
    }
    render () {
        return (
            <div className="body-loginBox">
            <BackGround/>
                <div className="loginBox">
                    <div className="loginBox-title"> Đăng Nhập </div>
                    <div className="loginBox-buff">
                    <div className="loginBox-text"> Tài Khoản  </div>
                    <input className="loginBox-input" placeholder="Nhập tài khoản" id="login-id"/>
                    <div className="loginBox-text"> Mật Khẩu  </div>
                    <input className="loginBox-input" type="password" placeholder="Nhập mật khẩu" id="login-password"/>
                    <button id="loginBox-button" onClick = { (e) => this.handleClickLogin(e)}> Đăng Nhập </button>
                    <div className="loginBox-link"> <a href='/signup'> Bạn Chưa Có Tài Khoản ? </a> </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogInComponent