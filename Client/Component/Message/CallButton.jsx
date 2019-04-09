import React, { Component } from 'react';

export default  class CallButton extends Component {
    newCall() {
        var win = window.open("http://localhost:3301/camera", '_blank', "width=400,height=600,left=450");
        win.focus();
    }
    render() {
        return (
                <div className={this.props.className} onClick={(e) => this.newCall()}>
                    {this.props.children}
                </div>
        )
    }
}