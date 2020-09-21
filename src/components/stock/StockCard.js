import React, { useState, useEffect } from 'react';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import ActivityCard from '../activity/ActivityCard';

export default function StockCard({ id, name, ticker, shares, costBasis, average_price, realized, activities, lastTrade }) {

    const renderTransactions = () => {
        return activities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
        ))
    }

    return (
        <Accordion>

            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <Container>
                        <Row>
                            <Col>
                                <h4 className="stockName">{name}</h4>
                                <small>{ticker}</small>

                            </Col>
                            <Col>
                                <small>Shares</small>
                                <h6>{shares}</h6>
                            </Col>
                            <Col>
                                <small>Market Value</small>
                                <h6>${(shares*lastTrade).toFixed(2)}</h6>
                            </Col>
                            <Col>
                                <small>Total Return</small>
                                <h6>${lastTrade ? 
                                    `${(lastTrade-average_price).toFixed(2)} (${(((lastTrade/average_price)-1)*100).toFixed(2)}%)`
                                    : 
                                    null}
                                </h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>${lastTrade ? lastTrade.toFixed(2) : null}</h3>
                            </Col>
                            <Col>
                                <small>Average Cost</small>
                                <h6>${average_price.toFixed(2)}</h6>
                            </Col>
                            <Col>
                                <small>Cost Basis</small>
                                <h6>${(costBasis).toFixed(2)}</h6>
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>
                    </Container>
                    <Accordion.Toggle variant="link" eventKey="0">
                        Transactions
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {renderTransactions()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>

    )
}