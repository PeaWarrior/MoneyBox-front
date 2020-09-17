import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PortfolioForm from './PortfolioForm';
import PortfolioCard from './PortfolioCard';
import { fetchPortfolios } from '../../store/portfolioActions';

export default function PortfolioListings() {
    const dispatch = useDispatch();
    const { portfolios } = useSelector(state => state.portfolio)
    
    useEffect(() => {
        dispatch(fetchPortfolios());
    }, [dispatch]);

    const renderPortfolios = () => {
        return portfolios.map(portfolio => {
            return <PortfolioCard key={portfolio.id} {...portfolio} />
        })
    }

    return (
        <div>
            <PortfolioForm />
            {renderPortfolios()}
        </div>
    )
}