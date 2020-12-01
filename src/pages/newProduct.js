import React, { Component } from 'react'
import Navbar from '../components/navbar'
import Sidebar from '../components/sidebar'
import AddProduct from '../components/addProduct'

export default class newProduct extends Component {
    render() {
        return (
            <div className="container">
                <Navbar />
                <div className="row">
                    <div className="col-2">
                        <Sidebar />
                    </div>
                    <div className="col-10">
                        <AddProduct />
                    </div>
                </div>
            </div>
        )
    }
}
