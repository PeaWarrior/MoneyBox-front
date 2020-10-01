import React from 'react';
import { useSelector} from 'react-redux';
import moment from 'moment';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function StockFundamental() {
    const { fundamental, dividend } = useSelector(state => state.stock.stock);
    
    return (
        <Card.Body>
            <Container>
            <h5>Fundamentals</h5>
            <Card>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col>
                                <div>
                                    <small>Open</small>
                                    <p>${fundamental.openPrice}</p>
                                </div>
                                <div>
                                    <small>Previous Close</small>
                                    <p>${fundamental.closePrice}</p>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <small>Today's High</small>
                                    <p>${fundamental.highPrice}</p>
                                </div>
                                <div>
                                    <small>Today's Low</small>
                                    <p>${fundamental.lowPrice}</p>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <small>52 Week High</small>
                                    <p>${fundamental.high52}</p>
                                </div>
                                <div>
                                    <small>52 Week Low</small>
                                    <p>${fundamental.low52}</p>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <small>P/E Ratio</small>
                                    <p>{fundamental.peRatio}</p>
                                </div>
                                <div>
                                    <small>Dividend Yield</small>
                                    <p>{dividend.yield}%</p>
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <small>Ex-dividend Date</small>
                                    {dividend.exDate ? 
                                        <p>{moment(dividend.exDate).format("MMMM DD, YYYY")}</p>
                                        :
                                        <p>N/A</p>
                                    }
                                </div>
                                <div>
                                    <small>Annual Dividend</small>
                                    <p>${dividend.amountPerYear}</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
            </Container>
        </Card.Body>
    )
}