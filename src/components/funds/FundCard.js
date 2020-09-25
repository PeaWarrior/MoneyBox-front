import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'moment';
import { Card, Container, Row, Col, ListGroup, Button } from 'react-bootstrap';

export default function FundCard({ id, category, amount, date }) {
    const dispatch = useDispatch();
    
    console.log(date);
    return (
        // <Card className="">
            <ListGroup className="d-flex justify-content-between">
                <ListGroup.Item>
                    <Row>
                        <Col>{Moment(date).format('YYYY-MM-DD')}</Col>
                        <Col>{category}</Col>
                        <Col>{category === 'Deposit' ? '+' : '-'}${amount.toFixed(2)}</Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        // </Card>
    )
};