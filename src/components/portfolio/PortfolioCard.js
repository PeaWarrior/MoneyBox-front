import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

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
        <Card>
            <Container>
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
                        <h6>${realized ? realized.toFixed(2) : 0}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {location.pathname === '/' ? <button onClick={handleClick} >View Portfolio</button> : null}
                    </Col>
                    <Col>
                        <small>Cash Available</small>
                        <h6>${cash}</h6>
                    </Col>
                    <Col>
                        <small>Total Cost Basis</small>
                        <h6>${costBasis}</h6>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}