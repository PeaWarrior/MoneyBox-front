import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Row, Col, Button } from 'react-bootstrap';

export default function PortfolioCard(props) {
    const history = useHistory();
    const location = useLocation();
    const { id, name, cash, costBasis, totalFunds, realized } = props

    const handleClick = event => {
        history.push({
            pathname: '/portfolio',
            state: { portfolioId: id }
        })
    };

    return (
            <Card.Header>
                <Row>
                    <Col>
                        <h1 className="stockName">{name}</h1>
                    </Col>
                    <Col>
                        <small>Original Investment</small>
                        <h6>${totalFunds}</h6>
                    </Col>
                    <Col>
                        <small>Realized Gains/Losses</small>
                        <h6>${realized}</h6>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <small>Cash Available</small>
                        <h6>${cash}</h6>
                    </Col>
                    <Col>
                        <small>Total Cost Basis</small>
                        <h6>${costBasis}</h6>
                    </Col>
                    <Col>
                        {location.pathname === '/' ? <Button onClick={handleClick} >View Portfolio</Button> : null}
                    </Col>
                </Row>
            </Card.Header>
    )
}