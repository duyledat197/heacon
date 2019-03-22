import React, { Component } from 'react'
import Header from './../Component/Home/Header/Header'
import Body from './../Component/Home/Body/Body'
// import BackGround from './../Component/BackGround/BackGround'
class Home extends Component {
    render () {
        return (
            <div>
                {/* <BackGround/> */}
                <Header/>
                <Body/>
            </div>
        )
    }
}

export default Home