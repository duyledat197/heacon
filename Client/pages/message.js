import React, { Component } from 'react'
import Message from './../Component/Message/Message'
// import {BrowserRouter} from 'react-router-dom'
class MessagePage extends Component {
    static async getInitialProps({ query }) {
        console.log('id=', query.id)
        return {id: query.id}
      }
    componentDidMount() {
        // console.log(this.props);
        // location.reload("/" + this.props.query.id);
        console.log(this.props.id);
        

    }
    render() {
        return (
                <Message id={this.props.id}/>
            // <div></div>
        )
    }
}

export default MessagePage