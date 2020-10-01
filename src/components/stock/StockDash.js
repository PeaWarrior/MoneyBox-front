import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BuyForm from '../activity/BuyForm';
import StockChart from './StockChart';

export default function StockDash({ name, ticker, fundamental }) {

    return (
        <Container>
            <Row>
                <Col md={8}>
                    <Container>
                        <Row><h2 className='mb-0'>{name}</h2></Row>
                    </Container>
                    <StockChart 
                        ticker={ticker} 
                        lastPrice={fundamental.lastPrice} 
                        openPrice={fundamental.openPrice} 
                    />
                </Col>

                <Col>
                    <BuyForm 
                        name={name}
                        ticker={ticker}
                        currentPrice={fundamental.lastPrice}
                    />
                </Col>
            </Row>
        </Container>
    )
}