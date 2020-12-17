import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class sidebar extends Component {
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-4">
                        <img src='https://avatars1.githubusercontent.com/u/70324722?s=460&v=4' alt=" "style={{ borderRadius: "50%", height: "55px", width: "55px" }} />
                    </div>
                    <div className="col-8">
                        <p style={{ fontSize: "12px" }} className="mt-1">Bayu</p>
                    </div>
                </div>
                <div style={{ height: "100px" }} className="ml-2">

                    <div className="dropdown">
                        <a className="dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Product
                            </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <Link to={{
                                pathname: `./list`,
                                state: this.state
                            }}>
                                <div className="dropdown-item">
                                    List Product
                                </div>
                            </Link>
                            <Link to={{
                                pathname: `./new`,
                                state: this.state
                            }}>
                                <div className="dropdown-item">
                                    Add Product
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
