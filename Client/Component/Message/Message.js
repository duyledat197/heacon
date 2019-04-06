import React, { Component } from 'react';
import './Message.scss';
var base64 = require('base-64');
var constant = require('./../../static/constant');
var myInfo = {
    id : "12321312312",
    name : "Lê Văn Thành"
}
var friendMassage = [
    {
        id : "12321312311",
        friend : {
            id : "1232131",
            name : "Lê Duy Đạt",
            avatar : {
                imgSmall : "./static/Atommm.jpg",
                imgBig : ""
            },
        },
        lastMassage : "ê mày! Nhớ tao không ?",
        lastTime : "12/10/2018"
    },
    {
        id : "12321312312",
        friend : {
            id : "1232131",
            name : "Lê Văn Thành",
            avatar : {
                imgSmall : "./static/Atommk.jpg",
                imgBig : ""
            },
        },
        lastMassage : "Nhớ cmm ",
        lastTime : "12/10/2018"
    },
    {
        id : "12321312313",
        friend : {
            id : "1232131",
            name : "Phan Thanh Liêm",
            avatar : {
                imgSmall : "./static/Atomyk.jpg",
                imgBig : ""
            },
        },
        lastMassage : "cc ",
        lastTime : "12/10/2018"
    }
]

var chat_message = [
    { id : "12321312312", text : "mai đi nhậu không ?" },
    { id : "12321312313", text : "tao ốm rồi" },
    { id : "12321312312", text : "ốm cc" },
    { id : "12321312312", text : "suốt ngày bệnh" },
    { id : "12321312313", text : "cmm" },
]
const PropFriendMessage = (props) => (
    <div className="friend-massage-square">
        <div className="friend-massage-avatar-info">
        <img src="./static/Atommk.jpg" className="friend-message-avatar"/>
            <div className="friend-massage-info">
                <div className="friend-massage-name"> {props.id}</div>
                <div className="friend-massage-lastMassage"> { props.lastMessage }</div>    
                <div className="friend-massage-lastTime"> { props.lastTime }</div>
            </div>
        </div>
        
        
    </div>
)
class ChatSquare extends Component {
    async componentDidMount(){
        // var chat_message;
        // await axios.post(constant.server, {token : this.props.token, idfriend : this.props.idfriend}).then(resp => {
        //     chat_message = resp.data;
        //     console.log(chat_message);
        //     this.setState({chat_message : chat_message})
        // })

        // {this.state.chat_message.map(e => (
        //     <PropMessageChat {...e} />
        // ))}
    }
    render () {
        return (
            <div className="chat-friend-online-container">
                <div className="chat-container">
                    <div className="chat-container-name">Tên Cuộc Trò Chuyện</div>
                    <div className="chat-container-content">
                        { chat_message.map( e => (
                            <PropMessageChat {...e} />
                        ))}
                    </div>
                    <div className="chat-container-text-input">
                        <div className="chat-container-text-input-left">
                            <div className="chat-container-text-input-left-buff">
                                <input className="chat-container-text-input-input"/>
                            </div>
                            <div className="chat-container-text-input-left-buff-button">
                                <button className="chat-container-text-input-button"> <img src="./static/icon_send.png" /> </button>
                            </div>
                        </div>
                        <div className="chat-container-text-input-right">
                                <CallButton/>
                            <VideoCallButton/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
function findNamebyId(id){
    var findName = friendMassage.find((e) => {
        return e.id == id;
    })
    console.log(findName);
    
    return findName.friend;
}
const PropMessageChat = (props) => (
    <div className={props.id == myInfo.id ? "prop-message-chat-right":"prop-message-chat-left"}>
    <img src={findNamebyId(props.id).avatar.imgSmall} className={props.id == myInfo.id ? "display-none":"friend-message-avatar"} ></img>
        <div className="prop-message-wrap">
            <div className={props.id == myInfo.id ? "display-none":"prop-message-chat-name"}>{ findNamebyId(props.id).name }</div>
            <div className={props.id == myInfo.id ? "prop-message-chat-content-right":"prop-message-chat-content-left"}> { props.text } </div>
        </div>
        {/* <br> */}
    </div>
)
class CallButton extends Component{
    newCall(){
        var win = window.open("http://localhost:3301/camera", '_blank',"width=400,height=600,left=450");
         win.focus();
    }
    render(){
        return(
            <div className="chat-container-text-input-left-buff-button">
            <button className="chat-container-text-input-right-button" onClick={(e) => this.newCall()}> 
                 <img src="./static/in_call_435414.png" width="100%"/>
            </button>
            </div>
        )
    }
}

class VideoCallButton extends Component{
    newCamera(){
        var win = window.open("http://localhost:3301/camera", '_blank',"width=1000,height=600,left=200");
         win.focus();
    }
    render(){
        return(
            <div className="chat-container-text-input-left-buff-button">
            <button className="chat-container-text-input-right-button" onClick={(e) => this.newCamera()}> 
                <img src="./static/videocall.jpg" width="100%"/>
            </button>
            </div>
        )
    }
}

class Message extends Component {
    constructor(props){
        super(props);
        this.state={
            friendMessage : [],
            idClient : '',
            isloadData : false
        }
    }
    getToken(){
        var tokenEncoded = localStorage.getItem('token');
        var token = base64.decode(tokenEncoded);
        return token;
    }
    async componentDidMount() {        
        if(this.state.isloadData == false) {
            var token = await this.getToken();
            // var clientInfo;
            // const fetchInfo = await fetch(constant.server + '/info', {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({token : token})
            // });
            // clientInfo = await fetchInfo.json();
        //     var friendMessage = [];
            // this.setState({isloadData : true});
            const fetchFriend = await  fetch( constant.server + '/message/friend' , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token : token}) })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    console.log(json.id);
                    
                    this.setState({
                         friendMessage : [...json.friend],
                        idClient : json.id,
                        isloadData: true
                    });

                })
        }
        
    }
    render () {
        if(this.state.isloadData === false) return false;
        else {
           console.log(this.state.friendMessage);
           
            return (
            <div className="message-container">
                <div className="friend-massage-container">
                    { this.state.friendMessage.map( e => {
                        return   <PropFriendMessage {...e} key={e._id}/>
                    }
                    )}
                </div>
                <ChatSquare/>
            </div>
        )
    }
}
}

export default Message