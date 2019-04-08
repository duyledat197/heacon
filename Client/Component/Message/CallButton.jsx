import React, { Component } from 'react';

export default  class CallButton extends Component {
    newCall() {
        var win = window.open("http://localhost:3301/camera", '_blank', "width=400,height=600,left=450");
        win.focus();
    }
    render() {
        return (
            <div className="chat-container-text-input-left-buff-button">
                <button className="chat-container-text-input-right-button" onClick={(e) => this.newCall()}>
                    <img src="./static/in_call_435414.png" width="100%" />
                </button>
            </div>
        )
    }
}