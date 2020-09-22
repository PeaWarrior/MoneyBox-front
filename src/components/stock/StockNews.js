import React from 'react';
import moment from 'moment';
import { Row, Col, Card } from 'react-bootstrap';

export default function StockNews({ headline, image, summary, url, datetime }) {

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col md={8}>
                        <Row>
                            <a href={url}><h5>{headline}</h5></a>
                        </Row>
                        <Row>
                            <small className="date">{moment.unix(datetime).format("MMMM D, YYYY | h:mma")}</small>
                        </Row>
                        <Row>
                            <p>{summary}</p>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <img src={image} alt="source" className="news-image" />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}