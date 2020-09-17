import React from 'react';
import TransactionFundForm from '../transaction/TransactionFundForm'

export default function PortfolioCard({ id, name }) {
    
    return (
        <div>
            <h1>{name}</h1>
            <TransactionFundForm name={name} portfolio_id={id} />
        </div>
    )
}