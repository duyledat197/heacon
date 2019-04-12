import React, { Component } from 'react'
import Header from './../Component/Home/Header/Header'
import Body from './../Component/Home/Body/Body'
import './index.scss'
import Router from 'next/router'
// import BackGround from './../Component/BackGround/BackGround'
var constant = require('./../static/constant');
var base64 = require('base-64');
import axios from 'axios'
class Home extends Component {
//     static async getInitialProps({ param }){
//     if(param.token){
//            var isLogin = false;
//            var info;
//            var token = base64.decode(param.token);
//         //    console.log(token);
           
//        await axios.post( constant.server + '/info',{token : token}).then(resp => {
//             // console.log(resp.data);
//             isLogin = true;
//             info = resp.data;
//         })

//         return {
//             isLogin,
//             info
//         }
//     }
//     else {
//         return {
//             isLogin : false
//         }
//     }
// }
    constructor(props){
        super(props);
        this.state = {
            isLogin : false,
            info : ''
        }
    }
    changeLink(path,param){
        console.log(param);  
        location.replace(path + '/' + param.id);
    }
    async componentDidMount(){
        var localStorageToken = localStorage.getItem('token');
        var token = base64.decode(localStorageToken);
        await axios.post( constant.server + '/info',{token : token}).then(resp => {
        // console.log(resp.data);
            this.setState({
                isLogin : true,
                info : resp.data
            })
        }).catch(err => {
            this.setState({
                isLogin : false,
                info : ''
            })
        })
        
    }
    handleLogout = () =>{
        localStorage.removeItem('token');
        this.setState({
            isLogin : false
        })
    }
    render () {
        return (
            <div className="main-cantainer">
                {/* <BackGround/> */}
                <Header {...this.state} handleLogout={this.handleLogout}/>
                <Body {...this.state} changeLink={this.changeLink}/>
            </div>
        )
    }
}

export default Home