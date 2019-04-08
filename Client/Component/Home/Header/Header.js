import React, { Component } from 'react'
import './Header.scss'
var base64 = require('base-64');
import Router from 'next/router'
class Header extends Component {
    constructor(props){
        super(props);
        // this.setState({isLogin : false});
    }
    componentWillMount(){
        console.log(this.props.info);
        
    }
    handleClick(s){
        
        location.replace('/' + s);
        
    }
    render () {
        return (
            <div className="header-row">
                <div className="header-start">
                <div className="header-brand"> HeaCon</div>
                {/* <div className="header-col"> Hello</div> */}
                </div>
                <div className={ this.props.isLogin ? "display-none":"header-end"}>
                    <button className="header-button" onClick={e => this.handleClick('login')}> Log In</button>
                    <button className="header-button" onClick={e => this.handleClick('signup')}> Sign Up</button>
                </div>
                <div className={ this.props.isLogin ? "header-info":"display-none"}>
                     <img src="./static/Atommk.jpg" className="friend-message-avatar"/>
                     {/* <div ></div> */}
                </div>
                
            </div>
        )
    }
}

export default Header