import React, { Component } from 'react'
import './Login.scss'
import BackGround from './../BackGround/BackGround'
var base64 = require('base-64');
// import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'
var constant = require('./../../static/constant');
class LogInComponent extends Component {
    handleClickLogin(e){
        let userName = document.getElementById('userName').value;
        let password = document.getElementById('password').value;
        axios.post(constant.server + '/login',{
            userName,
            password
        }).then((resp) => {
            console.log(resp.data);
            
            var encodedData = base64.encode(resp.data.token);
            localStorage.setItem("token", encodedData);
            // console.log(resp.data.token);
            
            // location.replace('/');
            Router.push({
                pathname: '/',
                // query: { token: encodedData }
            });
            
        }).catch((err) => {
            alert(err.toString());
        });   
    }
    render () {
        return (
            <div class="login-container">
            {/* <BackGround/> */}
            <div class="login-title">
                    Đăng Nhập
            </div>
            <div class="login-input-container">
                <div class="login-text">
                    Tên Đăng Nhập
                </div>
                <input type="text" class="login-input" id="userName"/>
            </div>
            <div class="login-input-container flex-direct-col" >
                <div class="login-text">
                    Mật Khẩu
                </div>
                <input type="password" class="login-input" id="password"/>
            </div>
            <div>
                <a href="/signup" class="flex-direct-row login-link">Bạn chưa có tài khoản ?</a>
            </div>
            <div class="login-input-container">
                <input type="button" class="login-button" value="Đăng Nhập" onClick={() => this.handleClickLogin()}/>
                   
            </div>
        </div>
        )
    }
}

export default LogInComponent