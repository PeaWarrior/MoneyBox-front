import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Container, Row, Col, Accordion, Button } from 'react-bootstrap';
import FundCard from './FundCard';

export default function FundListings() {
    const dispatch = useDispatch();
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
                    {funds.map(fund => <FundCard {...fund} /> )}
                </Card>
            )
        } else {
            return <>No transactions found</>
        }
    }

    return (
        <Container className="mt-5">
            <Accordion>
                    <Container className="pb-1">
                        <Row>
                            <Col>
                                <h2>Transfers</h2>
                            </Col>
                                <Accordion.Toggle 
                                    onClick={toggleShow}
                                    as={Button} 
                                    variant="link" 
                                    eventKey="0"
                                >
                                    <h3>{show ? 
                                        <i className="fas fa-chevron-up"></i>
                                        :
                                        <i className="fas fa-chevron-down"></i>
                                    }</h3>
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