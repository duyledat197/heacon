import React, { Component } from 'react'

class Camera extends Component {
    openStream() {
        navigator.mediaDevices.getUserMedia({ audio: false, video: { width: 1000, height: 600 } })
            .then(stream => {
                this.playVideo(stream, 'localStream');
            })
            .catch(err => console.log(err));
    }
    playVideo(stream, idVideo) {
        const video = document.getElementById(idVideo);
        video.srcObject = stream;
        video.onloadedmetadata = function () {
            video.play();
        };
    }    
    componentDidMount(){
        this.openStream();
    }
    render () {
        return (
            <div>
                <video id="localStream" width="1000px" height="500px"></video>
                <video></video>
            </div>
        )
    }
}

export default Camera