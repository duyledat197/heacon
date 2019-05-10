import React, { Component } from 'react'
import './Header.scss'
var base64 = require('base-64');
import Router from 'next/router'
class Header extends Component {
    state = {
        header_info_menu: false,
    }
    componentWillMount() {
        console.log(this.props.info);

    }
    handleClickRedirect(s) {

        location.replace('/' + s);

    }
    handleHeaderInfoMenuClick = () => {
        this.setState({
            header_info_menu: !this.state.header_info_menu
        })
    }
    handleLogout = () =>{
        
    }
    render() {
        return (
            <div className="header-row">
                <div className="header-start">
                    <div className="header-brand"> HeaCon<span>hub</span></div>
                    {/* <div className="header-col"> Hello</div> */}
                </div>
                {/* for not login user */}
                {(!this.props.isLogin) && <div className="header-end">
                    <button className="header-button" onClick={e => this.handleClickRedirect('login')}> Log In</button>
                    <button className="header-button" onClick={e => this.handleClickRedirect('signup')}> Sign Up</button>
                </div>}
                {/* for login user */}
                {this.props.isLogin && <div className="header-info">
                    <div className="header-setting-button"
                    onClick= {() => this.handleHeaderInfoMenuClick()}
                    >
                        <img src="./static/Atommk.jpg" className="friend-message-avatar" />
                        <div className={"header-setting-menu" + (this.state.header_info_menu ? "" : " disable")}>
                            <p className="setting-button"><a href="/userinfo">Information </a></p>
                            <p className="setting-button">Profile</p>
                            <p className="setting-button" onClick={() => this.props.handleLogout()}>Logout</p>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

export default Header