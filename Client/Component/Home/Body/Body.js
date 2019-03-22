import React, { Component } from 'react'
import './Body.scss'

var content = [
    "Bạn Muốn Hẹn Hò",
    "Bạn Muốn Có Gấu",
    "Bạn Muốn Người Yêu"
]
class Body extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.setState({count : 0});
    }
    componentDidMount(){
        setTimeout(
            function() {
                this.setState(prevState => ({
                    count : (prevState.count + 1) % 3
                }));
            }
            .bind(this),
            1200
        );
    }
    componentDidUpdate(){
        setTimeout(
            function() {
                this.setState(prevState => ({
                    count : (prevState.count + 1) % 3
                }));
            }
            .bind(this),
            1200
        );
    }
    render () {
        return (
            <div className="body-main">
            
            <div className="body-title"> Heart Connection </div>
                <div className="body-text"> { content[this.state.count] } </div>
                <button className="body-button"><i class="fas fa-heart"></i> </button>
            </div>
            
        )
    }
}

export default Body