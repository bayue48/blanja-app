import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import List from '../../components/account/list'
import { Container } from 'react-bootstrap'

export default class listProduct extends Component {
    render() {
        return (
            <>
                <Navbar />
                <Container>
                    <div className="row">
                        <div className="col-2">
                            <Sidebar />
                        </div>
                        <div className="col-10">
                            <List />
                        </div>
                    </div>
                </Container>
            </>
        )
    }
}
