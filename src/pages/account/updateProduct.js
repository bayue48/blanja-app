import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import EditProduct from '../../components/account/editProduct'
import { Container } from 'react-bootstrap'


export default class updateProduct extends Component {
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
                            <EditProduct />
                        </div>
                    </div>
                </Container>
            </>
        )
    }
}
