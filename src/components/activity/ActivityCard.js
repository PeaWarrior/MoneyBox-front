import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';

export default function ActivityCard ({ id, ticker, category, price, shares, date }) {
    
    return (
        <Card>
            <Card.Header>

            <Row>
                <Col>
                    <h6>{ticker}: {category}</h6>
                    <small>{moment(date).format('M/D/YYYY')}</small>
                </Col>
                <Col>
                    <small>Shares</small>
                    <h6>{shares}</h6>
                </Col>
                <Col>
                    <small>Average Price</small>
                    <h6>${(price).toFixed(2)}</h6>
                </Col>
                <Col>
                    <small>Total</small>
                    <h6>${(price * shares).toFixed(2)}</h6>
                </Col>
            </Row>
            </Card.Header>
        </Card>
    )
}