import React from 'react';
import { useSelector} from 'react-redux';
import moment from 'moment';
import { Card, Container, Row, Col } from 'react-bootstrap';

export default function StockFundamental() {
    const { fundamental, dividend } = useSelector(state => state.stock.stock);
    
    return (
        <Card.Body>
            <h5>Fundamentals</h5>
            <Card>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col md={3}>
                                <Row><small>Open</small></Row>
                                <Row><p>${fundamental.openPrice}</p></Row>
                            </Col>
                            <Col md={3}>
                                <Row><small>Today's High</small></Row>
                                <Row><p>${fundamental.highPrice}</p></Row>
                            </Col>
                            <Col md={3}>
                                <Row><small>P/E Ratio</small></Row>
                                <Row><p>{fundamental.peRatio}</p></Row>
                            </Col>
                            <Col md={3}>
                                <Row><small>Ex-dividend Date</small></Row>
                                <Row>
                                    {dividend.exDate ? 
                                    <p>{moment(dividend.exDate).format("MMMM DD, YYYY")}</p>
                                    :
                                    <p>N/A</p>}
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <Row><small>Previous Close</small></Row>
                                <Row><p>${fundamental.closePrice}</p></Row>
                            </Col>
                            <Col md={3}>
                                <Row><small>Today's Low</small></Row>
                                <Row><p>${fundamental.lowPrice}</p></Row>
                            </Col>
                            <Col md={3}>
                                <Row><small>Dividend Yield</small></Row>
                                <Row><p>{dividend.yield}%</p></Row>
                            </Col>
                            <Col md={3}>
                                <Row><small>Annual Dividend</small></Row>
                                <Row><p>${dividend.amountPerYear}</p></Row>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Card.Body>
    )
}