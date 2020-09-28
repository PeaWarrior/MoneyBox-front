import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Container, Card } from 'react-bootstrap';
import StockSearch from './StockSearch';
import StockDash from './StockDash';
import StockFundamental from './StockFundamental';
import StockNewsListings from './StockNewsListings';
// import ActivityListings from '../activity/ActivityListings';

export default function StockPage() {
    const stock = useSelector(state => state.stock.stock);
    const [lastTrade, setLastTrade] = useState(null);
    const [lastMinute, setLastMinute] = useState(moment().minute());

    useEffect(() => {
        if (stock.ticker) {
            const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUBB_API_KEY}`);

            socket.addEventListener('open', function (event) {
                socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock.ticker}))
            });

            let trade = null
            let minute = null
    
            socket.addEventListener('message', function (event) {
                const message = JSON.parse(event.data);
                if (message.type === 'trade') {
                    trade = message.data[0].p.toFixed(2);
                    // minute = message.data[0].t;
                    minute = moment(message.data[0].t).minute();
                }
            });

            const interval = setInterval(() => {
                setLastTrade(prevState => trade);
                setLastMinute(prevState => minute);
            }, 1000);
            
            return () => {
                socket.close();
                clearInterval(interval)
            }
        }
        // if (stock.ticker) {
        //     const lastMinute = moment().minute()
        //     const interval = setInterval(() => {
        //         setLastTrade(prevState => (Math.random())+112);
        //         setLastMinute(prevState => lastMinute);
        //     }, 1000);

        //     return () => {
        //         clearInterval(interval);
        //     }
        // }
    }, [stock.ticker]);

    return (
        <Container>
            <br/>
            <div className="d-flex justify-content-center">
                <StockSearch />
            </div>
            <br/>
            <Card>
                <Card.Header>
                    {stock.ticker ? <StockDash {...stock} lastTrade={lastTrade} lastMinute={lastMinute} /> : null}
                </Card.Header>
                {/* {stock.ticker ? <ActivityListings /> : null} */}
                {stock.ticker ? <StockFundamental /> : null}
                {stock.ticker ? <StockNewsListings news={stock.news} /> : null}
            </Card>
        </Container>
    )
}