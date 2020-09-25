import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
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
            return (
                <Card 
                    className="mt-3"
                    key={portfolio.id}
                >
                    <PortfolioCard  
                        index={index} 
                        {...portfolio} 
                    />
                </Card>
            )
        })
    }

    return (
        <Container className="mt-5">
            <PortfolioForm />
            {renderPortfolios()}
        </Container>
    )
}