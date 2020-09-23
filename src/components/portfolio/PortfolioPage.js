import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolio } from './portfolioActions';
import { Container, Card } from 'react-bootstrap';
import PortfolioCard from './PortfolioCard';
import StockListings from '../stock/StockListings';

export default function PortfolioPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const state = useSelector(state => state.portfolio.currentPortfolio)

    useEffect(() => {
        dispatch(fetchPortfolio(location.state.portfolioId))
    }, [location.state.portfolioId, dispatch]);

    return (
        <Container className="mt-5">
            <Card>
                <PortfolioCard {...state} />
                <StockListings />
            </Card>
        </Container>
    )
}