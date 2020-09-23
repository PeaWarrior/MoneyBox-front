import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Accordion, Card, Container, Row, Col, Button } from 'react-bootstrap';
import ActivityCard from '../activity/ActivityCard';
import { calculateChange } from './stockActions';
import ActivityForm from '../activity/ActivityForm';

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
    }, [currentPrice, dispatch, average_price, shares]);

    useEffect(() => {
        setCurrentStockPrice(dispatch(calculateChange(currentPrice, openPrice)));
    }, [currentPrice, dispatch, openPrice]);

    const renderTransactions = () => {
        return activities.map(activity => (
            <ActivityCard key={activity.id} ticker={ticker} {...activity} />
        ))
    };

    return (
        <Accordion>
            <Card className="mb-3">
                <Card.Header className="d-flex justify-content-between">
                    <Container>
                        <Row>
                            <Col>
                                <Row><h4>{ticker}</h4></Row>
                                <Row>Price</Row>
                                <Row>
                                    <h3 className={`mb-0 ${currentStockPrice.type === '+' ? 'pos' : 'neg'}`}>
                                        ${currentPrice}
                                    </h3>
                                </Row>
                                <Row>
                                    <small className={currentStockPrice.type === '+' ? 'pos' : 'neg'}>
                                        {currentStockPrice.message}
                                    </small>
                                    <small>Today</small>
                                </Row>
                            </Col>

                            <Col>
                                <Row><small>Shares</small></Row>
                                <Row><h6>{shares}</h6></Row>
                                <Row><small>Average Cost</small></Row>
                                <Row><h6>${average_price.toFixed(2)}</h6></Row>
                            </Col>

                            <Col>
                                <Row><small>Market Value</small></Row>
                                <Row>
                                    <h6 
                                        className={currentPrice > average_price ? 'pos' : 'neg'}
                                    >
                                        ${(currentPrice * shares).toFixed(2)}
                                    </h6>
                                    </Row>
                                <Row><small>Cost Basis</small></Row>
                                <Row><h6>${(costBasis).toFixed(2)}</h6></Row>
                            </Col>
                            <Col>
                                <small>Total Return</small>
                                <h6 className={currentChange.type === '+' ? 'pos' : 'neg'}>
                                    {currentChange.message}
                                </h6>
                            </Col>
                            <Col md={2}>
                                <Row>
                                    <Accordion.Toggle 
                                        as={Button} 
                                        eventKey="0" 
                                    >
                                        Transactions
                                    </Accordion.Toggle>
                                </Row>
                                <Row><br/></Row>
                                <Row>
                                    {currentPrice ? 
                                        <>
                                            <ActivityForm 
                                                category={'Buy'} 
                                                currentPrice={currentPrice} 
                                                ticker={ticker} 
                                                name={name} 
                                            />
                                            <ActivityForm 
                                                category={'Sell'} 
                                                currentPrice={currentPrice} 
                                                ticker={ticker} 
                                                name={name} 
                                            />
                                        </>
                                        :
                                        null
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Card.Title>Transactions</Card.Title>
                        {renderTransactions()}
                    </Card.Body>
                </Accordion.Collapse>
                
            </Card>
        </Accordion>
    )
};