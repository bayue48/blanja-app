import React, { Component } from 'react'
import { Row, Container, Card } from 'react-bootstrap'
import { star } from '../../src/assets'

export default class product extends Component {

    render() {
        const {name, brand, rating, desc, price, condition, id} = this.props
        return (
            <Container>
                <Card className="col-lg-2 col-md-3 col-sm-4 col-4 mr-3 ml-3 shadow bg-white rounded" id="cards" key={id}>           
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="price">Rp. {price}</p>
                        <p className="text-muted">{brand}</p>
                    </div>
                </Card>
            </Container>
        )
    }
}
