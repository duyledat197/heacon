import React, { Component } from 'react'
import './Body.scss'
import Wait from './../Wait/Wait'
var content = [
    "Bạn Muốn Hẹn Hò",
    "Bạn Muốn Có Gấu",
    "Bạn Muốn Người Yêu"
]
class Body extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.setState({
            count: 0,
            isConnect: false
        });
    }
    componentDidMount() {
        setTimeout(
            function () {
                this.setState(prevState => ({
                    count: (prevState.count + 1) % 3
                }));
            }
                .bind(this),
            1200
        );
    }
    componentDidUpdate() {
        setTimeout(
            function () {
                this.setState(prevState => ({
                    count: (prevState.count + 1) % 3
                }));
            }
                .bind(this),
            1200
        );
    }
    handleConnect() {
        if (this.props.isLogin) this.setState({ isConnect: true });
        else {
            location.replace('/login');
        }
    }
    handleDisConnect() {
        this.setState({ isConnect: false });
    }
    render() {
        return (
            <div className="body-main">
                <div>
                    <div className="body-title"> Heart Connection </div>
                    <div className="body-text"> {content[this.state.count]} </div>
                </div>
                <button className="body-button" onClick={(e) => this.handleConnect()}><i class="fas fa-heart"></i> </button>
                {/* <div className={this.state.isConnect ? "" : "display-none"}>
                    <Wait handleDisConnect={ this.handleDisConnect}/>
                </div> */}
                {this.state.isConnect ? <Wait handleDisConnect={this.handleDisConnect} changeLink={this.props.changeLink} /> : null}
            </div>

        )
    }
}

export default Body