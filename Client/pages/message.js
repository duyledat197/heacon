import React, { Component } from 'react'
import Message from './../Component/Message/Message'

// import {BrowserRouter} from 'react-router-dom'
class MessagePage extends Component {
    static async getInitialProps({ query }) {
        console.log('id=', query.id)
        return { id: query.id }
    }
    constructor(props) {
        super(props)
        this.state ={
            id: this.props.id
        }
        this.handleChangeRootId = this.handleChangeRootId.bind(this);
    }

    handleChangeRootId(id){
        this.setState({
            id: id
        })
    }
    render() {
        return (
            <Message handleChangeRootId={this.handleChangeRootId} id={this.state.id} />
        )
    }
}

export default MessagePage