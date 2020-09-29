import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import StockSearch from './StockSearch';
import StockDash from './StockDash';
import StockFundamental from './StockFundamental';
import StockNewsListings from './StockNewsListings';
// import ActivityListings from '../activity/ActivityListings';

export default function StockPage() {
    const stock = useSelector(state => state.stock.stock);

    return (
        <Container>
            <br/>
            <div className="d-flex justify-content-center">
                <StockSearch />
            </div>
            <br/>
            <Card>
                <Card.Header>
                    {stock.ticker ? <StockDash {...stock} /> : null}
                </Card.Header>
                {/* {stock.ticker ? <ActivityListings /> : null} */}
                {stock.ticker ? <StockFundamental /> : null}
                {stock.ticker ? <StockNewsListings news={stock.news} /> : null}
            </Card>
        </Container>
    )
}