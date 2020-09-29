import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ActivityForm from '../activity/ActivityForm';
import StockChart from './StockChart';

export default function StockDash({ name, ticker, fundamental }) {
    const [currentPrice, setCurrentPrice] = useState(fundamental.lastPrice);

    useEffect(() => {
        setCurrentPrice(fundamental.lastPrice);
    }, [ticker]);

    return (
        <Container>
            <Container>
            <Row>
                <h2 className='mb-0'>{name}</h2>
            </Row>
            </Container>
            <StockChart 
                ticker={ticker} 
                lastPrice={fundamental.lastPrice} 
                openPrice={fundamental.openPrice} 
            />
            <Row className="justify-content-end mt-3">
                {/* <Col> */}
                    <ActivityForm 
                        category={'Buy'} 
                        currentPrice={currentPrice} 
                        name={name} 
                        ticker={ticker} 
                        className="ml-auto"
                    />
                    <ActivityForm 
                        category={'Sell'} 
                        currentPrice={currentPrice} 
                        name={name} 
                        ticker={ticker} 
                        className="ml-auto"
                    />
                {/* </Col> */}
            </Row>
        </Container>
    )
}