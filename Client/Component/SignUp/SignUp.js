import React, { Component } from 'react'
import './SignUp.scss'
import BackGround from './../BackGround/BackGround'
class SignUp extends Component {
    
    render () {
        return (
            <form className="signup-main" action="http://localhost:3000/signup" method="POST">
                <BackGround/>
                <div className="signupBox">
                    <div className="signup-content">
                        <div className="signup-line">
                            <div className="signupBox-text"> Tên Đăng Nhập : </div>
                            <input className="signupBox-input" name="userName"/>
                        </div>
                        <div className="signup-line">
                            <div className="signupBox-text"> Mật Khẩu : </div>
                            <input type="password" className="signupBox-input" name="password"/>
                        </div>
                        <div className="signup-line">
                            <div className="signupBox-text" > Nhập Lại Mật Khẩu : </div>
                            <input type="password" className="signupBox-input" name="repeat-password"/>
                        </div>
                        <div className="sigup-name">
                                <div className="signup-line"> 
                                    <div className="signupBox-text" margin="15px"> Họ : </div> 
                                    <input className="signupBox-input" name="firstName"/>
                                </div>
                                <div className="signup-line">
                                    <div className="signupBox-text" margin="15px"> Tên : </div> 
                                    <input className="signupBox-input" name="lastName"/>
                                </div>
                        </div>
                        <div className="signup-gender">
                            <div className="signupBox-text"> Giới Tính : </div>
                            <div className="signup-radiogroup">
                            <input  className="signup-radio" type="radio" name="gender" value="male"/> <p className="sigupBox-text-gender">Nam</p> 
                            <input className="signup-radio" type="radio" name="gender" value="female"/> <p className="sigupBox-text-gender">Nữ </p>
                            </div>
                        </div>
                        <div className="signup-line">
                            <div className="signupBox-text"> Ngày Sinh : </div>
                            <input className="signupBox-input" type="date" name="birthday"/>
                        </div>
                        <div className="signup-buttongroup">
                            <button type="submit" className="signup-button"> Đăng Ký </button>
                            <button type="reset" className="signup-button"> Nhập Lại </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default SignUp