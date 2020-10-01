import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import StockSearch from './StockSearch';
import StockDash from './StockDash';
import StockFundamental from './StockFundamental';
import StockNewsListings from './StockNewsListings';

export default function StockPage() {
    const stock = useSelector(state => state.stock.stock);

    return (
        <Container>
            <br/>
            <div className="d-flex justify-content-center">
                <StockSearch />
            </div>
            <br/>
            {stock.ticker ?
            <Card>
                <Card.Header>
                    <StockDash {...stock} />
                </Card.Header>
                <StockFundamental />
                <StockNewsListings news={stock.news} />
            </Card>
            :
            null
            }
        </Container>
    )
}