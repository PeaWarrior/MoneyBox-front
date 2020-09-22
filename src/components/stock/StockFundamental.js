import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import { fetchStockNewsData } from './stockActions';

export default function StockFundamental() {
    const dispatch = useDispatch();
    const { name, ticker, fundamental, dividend, news } = useSelector(state => state.stock.stock);
    
    useEffect(() => {
        if (ticker) {
            dispatch(fetchStockNewsData(ticker));
        }
    }, [ticker])
    
    return (
        <>
            <Card.Header>
                <Row>
                    <Col>
                        <h5>{name}</h5>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small>{ticker}</small>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>

                </Row>
            </Card.Body>
        </>
    )
}