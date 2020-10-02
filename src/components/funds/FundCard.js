import React from 'react';
import Moment from 'moment';
import { Row, Col, ListGroup } from 'react-bootstrap';

export default function FundCard({ id, category, amount, date }) {
    
    return (
        <ListGroup className="d-flex justify-content-between">
            <ListGroup.Item>
                <Row>
                    <Col>{Moment(date).format('M/D/YYYY')}</Col>
                    <Col>{category}</Col>
                    <Col>{category === 'Deposit' ? '+' : '-'}${amount.toFixed(2)}</Col>
                </Row>
            </ListGroup.Item>
        </ListGroup>
    )
};