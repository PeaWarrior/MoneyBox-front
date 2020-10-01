import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';

export default function FundForm() {
    const { currentPortfolio } = useSelector(state => state.portfolio);
    const [form, setForm] = useState({
        portfolio_id: currentPortfolio.id,
        category: 'Deposit',
        amount: 0,
    });

    const handleChange = event => {
        event.persist();
        setForm(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };

    const handleSubmit = event => {

    };

    return (
        <Form className="buy-form pt-4 pb-3">
            <Container>
                <Form.Group as={Col}>
                    <Col>
                        <h5>Banking</h5>
                    </Col>
                </Form.Group>
                <hr/>

                <Form.Group as={Col} >
                    <Row>
                        <Form.Label column md={5}>Portfolio</Form.Label>
                        <Col md={7}>
                            <Form.Control
                                onChange={handleChange}
                                as="select"
                                name="portfolio_id"
                            >
                            </Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group as={Col} >
                    <Row>
                        <Form.Label column md={5}>Amount</Form.Label>
                        <Col md={7}>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>$</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control onChange={handleChange} name='amount' type="number" placeholder="Amount" value={form.amount} />
                            </InputGroup>
                        {/* <Form.Text muted>Price must not be negative.</Form.Text> */}
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group as={Col} >
                    <Row>
                        <Form.Label column md={3}>Date</Form.Label>
                        <Col md={9}>
            
                        <Form.Control 
                            onChange={handleChange} 
                            name='date' 
                            type="date" 
                            placeholder="Date" 
                            value={form.date} 
                            className="text-right"
                            />
                        {/* <Form.Text muted>Invalid date.</Form.Text> */}
                        </Col>
                    </Row>
                </Form.Group>
                <hr/>
                <Form.Group as={Col}>
                    <Row>

                        <Form.Label column>
                            <strong>Total:</strong>
                        </Form.Label>
                        <Form.Label column className="text-right">
                            <strong>${(Math.round((form.price * form.shares)*100)/100).toFixed(2)}</strong>
                        </Form.Label>
                    </Row>
                </Form.Group>

                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column md={7}>
                            <strong>Remaining Cash:</strong>
                        </Form.Label>
                        <Form.Label column md={5} className="text-right">
                            
                        </Form.Label>
                    </Row>
                </Form.Group>
            
                <Form.Group as={Col}>
                    <Button
                        block
                        variant="info" 
                        type="submit" 
                    >
                        Buy
                    </Button>
                </Form.Group>
            </Container>
        </Form>
    )
};