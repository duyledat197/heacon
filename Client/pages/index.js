import React, { Component } from 'react'
import Header from './../Component/Home/Header/Header'
import Body from './../Component/Home/Body/Body'
import Router from 'next/router'
// import BackGround from './../Component/BackGround/BackGround'
var constant = require('./../static/constant');
var base64 = require('base-64');
import axios from 'axios'
class Home extends Component {
    static async getInitialProps({ query }){
    if(query.token){
           var isLogin = false;
           var info;
           var token = base64.decode(query.token);
        //    console.log(token);
           
       await axios.post( constant.server + '/info',{token : token}).then(resp => {
            // console.log(resp.data);
            isLogin = true;
            info = resp.data;
        })

        return {
            isLogin,
            info
        }
    }
    else {
        return {
            isLogin : false
        }
    }
}
    changeLink(path,query){
        console.log(query);
        
        location.replace(path + '?id=' + query.id);
    }
    render () {
        return (
            <div>
                {/* <BackGround/> */}
                <Header {...this.props}/>
                <Body {...this.props} changeLink={this.changeLink}/>
            </div>
        )
    }
}

export default Home