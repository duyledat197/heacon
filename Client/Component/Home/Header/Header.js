import React, { Component } from 'react'
import './Header.scss'
class Header extends Component {
    render () {
        return (
            <div className="header-row">
                <div className="header-start">
                <div className="header-brand"> HeaCon</div>
                {/* <div className="header-col"> Hello</div> */}
                </div>
                <div className="header-end">
                    <button className="header-button"> Log In</button>
                    <button className="header-button"> Sign Up</button>
                </div>
                
            </div>
        )
    }
}

export default Header