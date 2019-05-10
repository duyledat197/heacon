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
            token : '',
           firstName : '',
           lastName : '',
           gender : '',
          birthday: ''
        }
    }

    handleChangelastName = (e) => {
        this.setState({lastName: e.target.value});
    }

    handleChangefirstName = (e) => {
        this.setState({firstName: e.target.value});
    }

    handleChangeGender = (e) => {
        this.setState({gender: e.target.value});
    }

    handleChangeBirthday = (e) => {
        this.setState({birthday: e.target.value});
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
                token : token,
                firstName : resp.data.firstName,
                lastName : resp.data.lastName,
                gender: resp.data.gender,
                birthday: resp.data.birthday
            })
        })

    }
    createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;
  
        reader.onload = (e) => {
          this.setState({
              img_url : e.target.result
          })
        };
        reader.readAsDataURL(file);
    }
    changeImage(e) {
        var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    }
    handleUpdateInfo(e){
        e.preventDefault();
        // console.log(e.target.gender.value);
        let formData = new FormData();
        formData.append('img', e.target.image_uploads.files[0]);
        formData.set('token', this.state.token);
        formData.set('firstName', e.target.firstName.value);
        formData.set('lastName', e.target.lastName.value);
        formData.set('gender', e.target.gender.value);
        formData.set('birthday', e.target.birthday.value);
        // let data = {
        //     token : this.state.token,
        //     firstName : e.target.firstName.value,
        //     lastName : e.target.lastName.value,
        //     gender : e.target.gender.value,
        //     birthday : e.target.birthday.value,
            

        // }
        axios({
            method : "POST",
            data : formData,
            url: constant.server + '/info/edit/profile',
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(resp => {
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
                        <button className="userInfo-button" value="Change avatar">  <input type="file" id="file_image" name="image_uploads" onChange={(e) => this.changeImage(e)}/></button>
                    </div>
                    <div className="userInfo-content">
                        <div classNam="userInfo-name">
                            <div className="userInfo-line">
                                <div className="userInfo-text">Họ:</div>
                                <input className="userInfo-input" id="ho" name="lastName" value={this.state.lastName} onChange={this.handleChangelastName}/>
                            </div>
                            <div className="userInfo-line">
                                <div className="userInfo-text">Tên:</div>
                                <input className="userInfo-input" id="ten" name="firstName" value={this.state.firstName} onChange={this.handleChangefirstName}/>
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
                            <input className="userInfo-input" type="date" id="ngaysinh" name="birthday" value={this.state.birthday} onChange={this.handleChangeBirthday}/>
                        </div>
                        <button className="userInfo-button" type="submit" >Cập nhật</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default UserInfo
