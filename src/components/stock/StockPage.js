import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import { fetchStockData } from './stockActions';
import StockSearch from './StockSearch';
import StockFundamental from './StockFundamental';
import StockNewsListings from './StockNewsListings';

export default function StockPage() {
    const dispatch = useDispatch();
    const { name, ticker, exchange, fundamental, dividend, news } = useSelector(state => state.stock.stock)
    // const [lastTrade, setLastTrade] = useState();

    // console.log(lastTrade)

    // useEffect(() => {
    //     const socket = new WebSocket(`wss://ws.finnhub.io?token=${process.env.REACT_APP_FINNHUBB_API_KEY}`);

    //     if (ticker) {
    
    //         socket.addEventListener('open', function (event) {
    //             socket.send(JSON.stringify({'type':'subscribe', 'symbol': ticker}))
    //         });
    
    //         socket.addEventListener('message', function (event) {
    //             const message = JSON.parse(event.data)
    //             if (message.type === 'trade') {
    //                 setLastTrade(prevState => ({
    //                     ...prevState,
    //                     [message.data[0].s]: message.data[0].p
    //                 }))
    //             }
    //         });
    //     }

    //     return () => {
    //         socket.close();
    //     }
    // }, [ticker])

    return (
        <Container>
            <br/>
            <div className="d-flex justify-content-center">
                <StockSearch />
            </div>
            <br/>
            <Card>
                {ticker ? <StockFundamental /> : null}
                {ticker ? <StockNewsListings news={news} /> : null}
            </Card>
        </Container>
    )
}