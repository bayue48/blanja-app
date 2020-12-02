import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class sidebar extends Component {
    render() {
        return (
            <>
                <ul>
                    <li>
                        <Link to={{
                            pathname: `./newProduct`,
                            state: this.state
                        }}>Add Product</Link>
                    </li>
                </ul>
            </>
        )
    }
}
