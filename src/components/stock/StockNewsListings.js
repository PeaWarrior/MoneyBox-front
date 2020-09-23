import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import StockNews from './StockNews';

export default function StockNewsListings({ news }) {

    const renderArticles = () => {
        return news.map(article => <StockNews key={article.id} {...article} />)
    }

    return (
        <Card.Body>
            {news.length > 0 ?
            <>
                <h5>Recent News</h5>
                {renderArticles()}
            </>
            :
            null
            }
        </Card.Body>
    )
}