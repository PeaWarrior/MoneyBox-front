import React, { useState } from 'react';
import { Card, Row, Col, Container, Button } from 'react-bootstrap';
import StockNews from './StockNews';

export default function StockNewsListings({ news }) {
    const [currentPage, setCurrentPage] = useState(1);

    const handleClickIncrementPage = event => {
        setCurrentPage(currentPage+1)
    };
    const handleClickDecrementPage = event => {
        setCurrentPage(currentPage-1)
    };

    const renderArticles = () => {
        const currentNews = news.slice(((currentPage-1)*4), (currentPage*4))
        return currentNews.map(article => <StockNews key={article.id} {...article} />)
    };

    return (
        <Card.Body>
            {news.length > 0 ?
            <>
                <Container>

                <Row>
                    <Col>
                        <h5>Recent News</h5>
                    </Col>
                    <Button 
                        variant="link"
                        disabled={currentPage === 1 ? true : false}
                        onClick={handleClickDecrementPage}
                    >
                        {<i className="fas fa-chevron-left"></i>}
                    </Button>
                    <Button 
                        variant="link"
                        disabled={news.length <= currentPage * 4 ? true : false}
                        onClick={handleClickIncrementPage}
                        >
                        <i className="fas fa-chevron-right"></i>
                    </Button>
                </Row>
                </Container>
                {renderArticles()}
            </>
            :
            null
            }
        </Card.Body>
    )
}