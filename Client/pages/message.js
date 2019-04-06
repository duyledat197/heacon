import React, { Component } from 'react'
import Message from './../Component/Message/Message'
class MessagePage extends Component {
    static async getInitialProps({ query }) {
        // console.log('ID', query.id);
        return {
            id : query.id
        }
    }
    componentWillMount(){
        // console.log(this.props);
        
    }
    render () {
        return (
            <div>
                <Message { ...this.props.id}/>
            </div>
        )
    }
}

export default MessagePage