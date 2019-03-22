import React, { Component } from 'react'

class Camera extends Component {
    newCamera(){
        var win = window.open("http://localhost:3301/camera", '_blank',"width=1000,height=600,left=200");
         win.focus();
    }
    render () {
        return (
            <div>
               <button onClick={(e) => this.newCamera()}> New Tab </button>
            </div>
        )
    }
}

export default Camera