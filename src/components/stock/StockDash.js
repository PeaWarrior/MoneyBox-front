import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { calculateChange } from './stockActions';
import ActivityForm from '../activity/ActivityForm';

export default function StockDash({ name, ticker, lastTrade, fundamental }) {
    const dispatch = useDispatch();
    const [currentPrice, setCurrentPrice] = useState(fundamental.lastPrice);
    const [currentChange, setCurrentChange] = useState({})

    useEffect(() => {
        if (lastTrade) {
            setCurrentPrice(lastTrade);
        }
    }, [lastTrade]);

    useEffect(() => {
        setCurrentChange(dispatch(calculateChange(currentPrice, fundamental.openPrice)));
    }, [currentPrice, dispatch, fundamental.openPrice]);

    const handleClick = event => {
        // dispatch();
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Row><h2 className='mb-0'>{name}</h2></Row>
                    <Row><small>{ticker}</small></Row>
                    <br/>
                    <Row>
                        <h3 className={`mb-0 ${currentChange.type === '+' ? 'pos' : 'neg'}`}>
                            ${currentPrice}
                        </h3>
                    </Row>
                    <Row>
                        <small className={currentChange.type === '+' ? 'pos' : 'neg'}>
                            {currentChange.message}
                        </small>
                        <small>Today</small>
                    </Row>
                </Col>
                <Col>
                    INSERT GRAPH HERE?
                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col>
                    <ActivityForm category={'Buy'} currentPrice={currentPrice} name={name} ticker={ticker} />
                </Col>
            </Row>
        </Container>
    )
}