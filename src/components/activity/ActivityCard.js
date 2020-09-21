import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';

export default function ActivityCard ({ id, category, price, shares, date }) {
    
    return (
        <Card>
            <Card.Header>

            <Row>
                <Col>
                    <h6>{category.toUpperCase()}</h6>
                    <small>{date}</small>
                </Col>
                <Col>
                    <small>Shares</small>
                    <h6>{shares}</h6>
                </Col>
                <Col>
                    <small>Average Price</small>
                    <h6>${(price/shares).toFixed(2)}</h6>
                </Col>
                <Col>
                    <small>Total</small>
                    <h6>{category === 'buy' ? '+' : '-'}${price.toFixed(2)}</h6>
                </Col>
            </Row>
            </Card.Header>
        </Card>
    )
}