import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import ActivityCard from '../activity/ActivityCard';
import { calculateChange } from './stockActions';

export default function StockCard({ id, name, ticker, shares, costBasis, average_price, realized, activities, lastTrade, lastPrice, openPrice }) {
    const dispatch = useDispatch();
    const [currentPrice, setCurrentPrice] = useState(lastPrice);
    const [currentChange, setCurrentChange] = useState({});
    const [currentStockPrice, setCurrentStockPrice] = useState({});

    useEffect(() => {
        if (lastTrade) {
            setCurrentPrice(lastTrade.toFixed(2));
        }
    }, [lastTrade]);

    useEffect(() => {
        if (lastPrice) {
            setCurrentPrice(lastPrice.toFixed(2));
        }
    }, [lastPrice]);

    useEffect(() => {
        setCurrentChange(dispatch(calculateChange(currentPrice, average_price, shares)));
    }, [currentPrice]);

    useEffect(() => {
        setCurrentStockPrice(dispatch(calculateChange(currentPrice, openPrice)));
    }, [currentPrice]);

    const renderTransactions = () => {
        return activities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
        ))
    };

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
                                <small>Average Cost</small>
                                <h6>${average_price.toFixed(2)}</h6>
                            </Col>
                            <Col>
                                <small>Market Value</small>
                                <h6>${currentPrice * shares}</h6>
                            </Col>
                            <Col>
                                <small>Total Return</small>
                                <h6 className={currentChange.type === '+' ? 'pos' : 'neg'}>
                                    {currentChange.message}
                                </h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                    <h3 className={`mb-0 ${currentStockPrice.type === '+' ? 'pos' : 'neg'}`}>${currentPrice}</h3>
                                    <small className={currentStockPrice.type === '+' ? 'pos' : 'neg'}>{currentStockPrice.message}</small>
                                    <small>Today</small>
                            </Col>
                            <Col>
                                <small>Shares</small>
                                <h6>{shares}</h6>
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