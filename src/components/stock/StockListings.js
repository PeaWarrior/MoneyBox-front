import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Accordion, Card, Row, Col, Button } from 'react-bootstrap';
import StockCard from './StockCard';
import { fetchStockQuotes } from './stockActions';

export default function StockListings() {
    const dispatch = useDispatch();
    const {stocks, quotes} = useSelector(state => state.stock);
    const [lastTrade, setLastTrade] = useState({});
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (stocks.length > 0) {
            const queries = stocks.map(stock => stock.ticker.toUpperCase());
            dispatch(fetchStockQuotes(queries.join()))
        }
    }, [stocks, dispatch])

    useEffect(() => {
        const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUBB_API_KEY}`);

        socket.addEventListener('open', function (event) {
            stocks.forEach(stock => {
                if (stock.shares > 0) {
                    socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock.ticker}))
                }
            })
        });

        const trades = {}

        socket.addEventListener('message', function (event) {
            const message = JSON.parse(event.data);
            if (message.type === 'trade') {
                trades[message.data[0].s] = message.data[0].p.toFixed(2)
            };
        });

        const interval = setInterval(() => {
            setLastTrade(prevState => ({
                ...prevState,
                ...trades
            }));
        }, 1000);

        return () => {
            socket.close();
            clearInterval(interval);
        }
    }, [stocks]);

    const toggleShow = event => {
        setShow(!show);
    };

    const renderStocks = () => {
        const stocksWithShares = stocks.map(stock => {
            if (stock.shares > 0) {
                return <StockCard key={stock.id} {...quotes[stock.ticker]} lastTrade={lastTrade[stock.ticker]} {...stock} />
            } else return 'NONE'
        });
        return stocksWithShares.length > 0 ? stocksWithShares : <>No current positions</>
    }

    return (
        <Container className="mt-3">
            <Accordion>

                <Container className="pb-1">
                    <Row>
                        <Col>
                            <h2>Positions</h2>
                        </Col>
                        <Accordion.Toggle 
                            onClick={toggleShow}
                            as={Button} 
                            variant="link" 
                            eventKey="0"
                        >
                            <h3>{show ? 
                                <i className="fas fa-chevron-up"></i>
                                :
                                <i className="fas fa-chevron-down"></i>
                            }</h3>
                        </Accordion.Toggle>
                    </Row>
                    <hr/>
                </Container>

                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {renderStocks()}
                    </Card.Body>
                </Accordion.Collapse>

            </Accordion>
        </Container>
    )
}