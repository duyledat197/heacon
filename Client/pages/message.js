import React, { Component } from 'react'
import Message from './../Component/Message/Message'
class MessagePage extends Component {
    static async getInitialProps({ query }) {
        // console.log('ID', query.id);
        return {
            id : query.id
        }
    }
    componentDidMount(){
        // console.log(this.props);
        // location.reload("/" + this.props.query.id);
        
    }
    render () {
        return (
            <div>
                <Message/>
            </div>
        )
    }
}

export default MessagePage