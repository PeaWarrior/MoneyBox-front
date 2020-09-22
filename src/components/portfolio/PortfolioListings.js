import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import PortfolioForm from './PortfolioForm';
import PortfolioCard from './PortfolioCard';
import { fetchPortfolios } from './portfolioActions';

export default function PortfolioListings() {
    const dispatch = useDispatch();
    const { portfolios } = useSelector(state => state.portfolio)
    
    useEffect(() => {
        dispatch(fetchPortfolios());
    }, [dispatch]);

    const renderPortfolios = () => {
        return portfolios.map((portfolio, index) => {
            return <PortfolioCard key={portfolio.id} index={index} {...portfolio} />
        })
    }

    return (
        <Container>
            <PortfolioForm />
            {renderPortfolios()}
        </Container>
    )
}