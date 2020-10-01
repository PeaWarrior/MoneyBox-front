import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import FundCard from './FundCard';

export default function FundListings() {
    const { funds } = useSelector(state => state.portfolio.currentPortfolio);
    const [show, setShow] = useState(false);

    const toggleShow = event => {
        setShow(!show);
    };

    const renderFunds = () => {
        if (funds && funds.length) {
            return (
                <Card>
                    <Card.Header>
                        <Row>
                            <Col>Date</Col>
                            <Col>Transaction</Col>
                            <Col>Change</Col>
                        </Row>
                    </Card.Header>
                    {funds.map(fund => <FundCard key={fund.id} {...fund} /> )}
                </Card>
            )
        } else {
            return <>No transactions found</>
        }
    }

    return (
        <Container className="mb-5">
            <Accordion>
                    <Container className="pb-1">
                        <Row>
                            <Accordion.Toggle 
                                onClick={toggleShow}
                                as={Button}
                                block 
                                variant="link" 
                                eventKey="0"
                            >
                            <Row>
                                <Col><h2>Transfers</h2></Col>
                                <Col>
                                    <h2>{show ? 
                                        <i className="fas fa-chevron-up"></i>
                                        :
                                        <i className="fas fa-chevron-down"></i>
                                    }</h2>
                                </Col>
                            </Row>
                            </Accordion.Toggle>
                        </Row>
                        <hr/>
                    </Container>

                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            {renderFunds()}
                        </Card.Body>
                    </Accordion.Collapse>
            </Accordion>
        </Container>
    )
}