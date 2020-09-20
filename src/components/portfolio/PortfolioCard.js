import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function PortfolioCard(props) {
    const history = useHistory();
    const location = useLocation();
    const { id, name, cash, costBasis, totalFunds, realized } = props

    const handleClick = event => {
        history.push({
            pathname: '/portfolio',
            state: { portfolioId: id }
        })
    };

    return (
        <div className="box">
            <h1>{name}</h1>
            <div>
                <span>Original Investment: ${totalFunds}</span>
                <span>Cash: ${cash}</span>
                <span>Total Cost Basis: ${costBasis}</span>
                <span>Total Realized Gains/Losses: ${realized}</span>
            </div>
            {location.pathname === '/portfolios' ? <button onClick={handleClick} >View Portfolio</button> : null}
        </div>
    )
}