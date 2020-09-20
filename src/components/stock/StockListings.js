import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import StockCard from './StockCard';

export default function StockListings() {
    const stocks = useSelector(state => state.stock.stocks);
    const [lastTrade, setLastTrade] = useState({});

    useEffect(() => {
        if (stocks.length > 0) {
            const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUBB_API_KEY}`);

            socket.addEventListener('open', function (event) {
                stocks.forEach(stock => {
                    socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock.ticker}))
                })
            });

            socket.addEventListener('message', function (event) {
                const message = JSON.parse(event.data)
                if (message.type === 'trade') {
                    setLastTrade(prevState => ({
                        ...prevState,
                        [message.data[0].s]: message.data[0].p
                    }))
                }
                // console.log(message.data[0].p);
            });

            return () => {
                stocks.forEach(stock => {
                    socket.send(JSON.stringify({'type':'unsubscribe', 'symbol': stock.ticker}))
                })
            }
        }
    }, [stocks]);

    const renderStocks = () => {
        return stocks.map(stock => <StockCard key={stock.id} {...stock} />)
    }

    return (
        <Container>
            <h1>Positions</h1>
            {renderStocks()}
        </Container>
    )
}