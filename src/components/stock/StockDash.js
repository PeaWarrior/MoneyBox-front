import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { calculateChange } from './stockActions';
import ActivityForm from '../activity/ActivityForm';
import StockChart from './StockChart';

export default function StockDash({ name, ticker, lastTrade, fundamental, lastMinute }) {
    const dispatch = useDispatch();
    const [currentPrice, setCurrentPrice] = useState(fundamental.lastPrice);
    const [currentChange, setCurrentChange] = useState({});

    useEffect(() => {
        if (lastTrade) {
            setCurrentPrice(lastTrade);
        }
    }, [lastTrade]);

    useEffect(() => {
        setCurrentPrice(fundamental.lastPrice);
    }, [ticker]);

    useEffect(() => {
        setCurrentChange(dispatch(calculateChange(currentPrice, fundamental.openPrice)));
    }, [currentPrice, dispatch, fundamental.openPrice]);

    return (
        <Container>
            <Container>
            <Row>
                <h2 className='mb-0'>{name}</h2>
            </Row>
            </Container>
            <StockChart 
                ticker={ticker} 
                currentPrice={currentPrice} 
                openPrice={fundamental.openPrice} 
                lastMinute={lastMinute}
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