import React, { Component } from 'react'
import './UserInfo.scss'
import base64 from 'base-64'
import axios from 'axios'
import constant from './../../static/constant'

class UserInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            img_url : '',
            token : ''
        }
    }
    getToken() {
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }
    componentDidMount(){
        let token = this.getToken();
        axios.post(constant.server + '/info', {token}).then(resp =>{
            this.setState({
                img_url : constant.server + '/avatar/' + resp.data.id + '.jpg',
                token : token
            })
        })

    }
    handleUpdateInfo(e){
        e.preventDefault();
        // console.log(e.target.gender.value);
        
        let data = {
            token,
            firstName : e.target.firstName.value,
            lastName : e.target.lastName.value,
            gender : e.target.gender.value,
            birthday : e.target.birthday.value,
            img : e.target.image_uploads.files

        }
        axios.post(constant.server + '/edit/profile', {data}).then(resp => {
            console.log(resp);
            
        }).catch(err => {
            console.log(err);
            
        })
        
    }
    // testhandleonChange(e){
    //     let url = e.target.value;
    //     console.log(e.target.files[0].path);
        
    //     this.setState({
    //         img_url : url
    //     })
        
    // }
    render() {
        return (                         
            <form id="formtest" method="POST" onSubmit={(e) => this.handleUpdateInfo(e)} >
                <div className="header">
                    <h1>My Profile</h1>
                    <p>brought to you by heacon</p>                    
                </div>
                <div className="row">
                    <div className="side">                        
                        <img src={ this.state.img_url } alt="avatar" />
                        <button className="userInfo-button" value="Change avatar">  <input type="file" id="file_image" name="image_uploads" /></button>
                    </div>
                    <div className="userInfo-content">
                        <div classNam="userInfo-name">
                            <div className="userInfo-line">
                                <div className="userInfo-text">Họ:</div>
                                <input className="userInfo-input" id="ho" name="lastName"/>
                            </div>
                            <div className="userInfo-line">
                                <div className="userInfo-text">Tên:</div>
                                <input className="userInfo-input" id="ten" name="firstName" />
                            </div>
                        </div>                        
                        <div className="userInfo-gender">
                            <div className="userInfo-text">Giới tính:</div>
                            <div className="userInfo-radiogroup">
                                <input className="userInfo-radio" type="radio" id="nam" name="gender" value="male" checked /> <p>Nam</p>
                                <input className="userInfo-radio" type="radio" name="gender" value="female" /> <p>Nữ</p>
                            </div>
                        </div>
                        <div className="userInfo-line">
                            <div className="userInfo-text">Ngày sinh:</div>
                            <input className="userInfo-input" type="date" id="ngaysinh" name="birthday"/>
                        </div>
                        <button className="userInfo-button" type="submit" >Cập nhật</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default UserInfo
