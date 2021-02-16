import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import User from '../../components/account/user'


export default class profile extends Component {
    render() {
        return (
            <>
                <Navbar />
                <User />
            </>
        )
    }
}
