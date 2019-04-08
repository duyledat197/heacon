import React, { Component } from 'react';

export default  class VideoCallButton extends Component {
    newCamera() {
        var win = window.open("http://localhost:3301/camera", '_blank', "width=1000,height=600,left=200");
        win.focus();
    }
    render() {
        return (
            <div className="chat-container-text-input-left-buff-button">
                <button className="chat-container-text-input-right-button" onClick={(e) => this.newCamera()}>
                    <img src="./static/videocall.jpg" width="100%" />
                </button>
            </div>
        )
    }
}