import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import ActivityCard from '../activity/ActivityCard';

export default function StockCard({ id, name, ticker, shares, average_price, realized, activities }) {

    const renderTransactions = () => {
        return activities.map(activity => (
            <ActivityCard key={activity.id} {...activity} />
        ))
    }

    return (
        <Accordion>

            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <h4>{name}</h4>
                    {/* <h5>Price: {currentStockPrice}</h5> */}
                    <Accordion.Toggle variant="link" eventKey="0">
                        Transactions
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {renderTransactions()}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>

    )
}