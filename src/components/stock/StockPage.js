import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import StockSearch from './StockSearch';
import StockDash from './StockDash';
import StockFundamental from './StockFundamental';
import StockNewsListings from './StockNewsListings';
// import ActivityListings from '../activity/ActivityListings';

export default function StockPage() {
    const stock = useSelector(state => state.stock.stock);
    const [lastTrade, setLastTrade] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUBB_API_KEY}`);

        if (stock.ticker) {
            socket.addEventListener('open', function (event) {
                socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock.ticker}))
            });
    
            socket.addEventListener('message', function (event) {
                const message = JSON.parse(event.data)
                if (message.type === 'trade') {
                    setLastTrade(message.data[0].p.toFixed(2))
                }
            });
        }

        return () => socket.close()
    }, [stock.ticker])

    return (
        <Container>
            <br/>
            <div className="d-flex justify-content-center">
                <StockSearch />
            </div>
            <br/>
            <Card>
                <Card.Header>
                    {stock.ticker ? <StockDash {...stock} lastTrade={lastTrade} /> : null}
                </Card.Header>
                {/* {stock.ticker ? <ActivityListings /> : null} */}
                {stock.ticker ? <StockFundamental /> : null}
                {stock.ticker ? <StockNewsListings news={stock.news} /> : null}
            </Card>
        </Container>
    )
}