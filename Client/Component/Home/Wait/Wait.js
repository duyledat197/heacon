import React, { Component } from 'react'
import './Wait.scss'
import axios from 'axios'
import Router from 'next/router'
import openSocket from 'socket.io-client';
import { log } from 'util';
var base64 = require('base-64')
var socket;
var constant = require('./../../../static/constant')
class Wait extends Component {
    getTokenfromlocalStorage(){
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }
    async componentDidMount(){
        // await axios.post('/connect',{ token : this.props.token}).then(resp => {
            
        // })
        // var intervalConnect =  await setInterval( async() => {
        
        // },1000)
        // await 
        socket = openSocket(constant.server);
        // var tokenEncoded = localStorage.getItem('token');
        // var token = base64.decode(tokenEncoded);
        // var count = 0;
        // var changePage = true;
        // var idRecord;
        var token = this.getTokenfromlocalStorage();
        var info;
        // console.log(token);
        await axios.post( constant.server + '/info', {
            token : token
        }).then(resp => {
            console.log(resp.data);
            info = resp.data;
            
        })
        socket.emit('FIND_LOVER',info.id);
        socket.on('FIND_OUT', (id) =>{
            console.log(id);
            this.props.changeLink('/message', {
                id : id
            })
           
        })
        await setTimeout(() => {
            alert('Không Tìm Được Người Phù Hợp');
            this.props.handleDisConnect();
            socket.close();
        },5*60*1000);

    }
    render () {
        return (
            <div className="wait-container">
                Đang Kết Nối ...
            </div>
        )
    }
}

export default Wait