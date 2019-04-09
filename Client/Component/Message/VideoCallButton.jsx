import React, { Component } from 'react';

export default  class VideoCallButton extends Component {
    newCamera() {
        var win = window.open("http://localhost:3301/camera", '_blank', "width=1000,height=600,left=200");
        win.focus();
    }
    render() {
        return (
                <div className={this.props.className} onClick={(e) => this.newCamera()}>
                    {this.props.children}
                </div>
        )
    }
}