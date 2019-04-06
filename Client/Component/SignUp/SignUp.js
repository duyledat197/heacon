import React, { Component } from 'react'
import './SignUp.scss'
import BackGround from './../BackGround/BackGround'
const axios = require('axios');
var constant = require('./../../static/constant');
class SignUp extends Component {
    handleSignUp(){
        // console.log();
        let userName = document.getElementById('userName').value;
        let password = document.getElementById('password').value;
        let repeatPassword = document.getElementById('repeat-password').value;
        let gender
        if(document.getElementById('gender-male').checked) gender = 'male';
        else gender = 'female';
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let birthday = document.getElementById('birthday').value;
        var form = document.getElementById('formtest');
        console.log(gender);
        
        if(password !== repeatPassword) {
            alert('Mật Khẩu không khớp');
            form.reset();
        }
        else {
            axios.post( constant.server + '/signup',{
            userName,
            password,
            gender,
            firstName,
            lastName,
            birthday
        }).then((resp) => {
            alert('Đăng Kí Thành Công');
            location.replace('/login');
            
        }).catch((err) => {
            alert(err.toString());
        });   
        // form.submit();
        }
        
    }
    render () {
        return (
            <form className="signup-main" id="formtest">
                <BackGround/>
                <div className="signupBox">
                    <div className="signup-content">
                        <div className="signup-line">
                            <div className="signupBox-text"> Tên Đăng Nhập : </div>
                            <input className="signupBox-input" id="userName"/>
                        </div>
                        <div className="signup-line">
                            <div className="signupBox-text"> Mật Khẩu : </div>
                            <input type="password" className="signupBox-input" id="password"/>
                        </div>
                        <div className="signup-line">
                            <div className="signupBox-text" > Nhập Lại Mật Khẩu : </div>
                            <input type="password" className="signupBox-input" id="repeat-password"/>
                        </div>
                        <div className="sigup-name">
                                <div className="signup-line"> 
                                    <div className="signupBox-text" margin="15px"> Họ : </div> 
                                    <input className="signupBox-input" id="lastName"/>
                                </div>
                                <div className="signup-line">
                                    <div className="signupBox-text" margin="15px"> Tên : </div> 
                                    <input className="signupBox-input" id="firstName"/>
                                </div>
                        </div>
                        <div className="signup-gender">
                            <div className="signupBox-text"> Giới Tính : </div>
                            <div className="signup-radiogroup">
                            <input  className="signup-radio" type="radio" id="gender-male" name="gender" value="male" checked/> <p className="sigupBox-text-gender">Nam</p> 
                            <input className="signup-radio" type="radio" name="gender" value="female"/> <p className="sigupBox-text-gender">Nữ </p>
                            </div>
                        </div>
                        <div className="signup-line">
                            <div className="signupBox-text"> Ngày Sinh : </div>
                            <input className="signupBox-input" type="date" id="birthday"/>
                        </div>
                        <div className="signup-buttongroup">
                            <button  className="signup-button" type="button" onClick={() => this.handleSignUp()}> Đăng Ký </button>
                            <button type="reset" className="signup-button"> Nhập Lại </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default SignUp