import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import moment from 'moment';
import { createFund } from '../funds/fundActions';

export default function FundForm() {
    const dispatch = useDispatch();
    const { currentPortfolio } = useSelector(state => state.portfolio);
    const [form, setForm] = useState({
        portfolio_id: currentPortfolio.id,
        category: 'Deposit',
        amount: 0,
        date: moment().format('YYYY-MM-DD')
    });

    useEffect(() => {
        setForm({
            ...form,
            portfolio_id: currentPortfolio.id
        })
    }, [currentPortfolio])

    const handleChange = event => {
        event.persist();
        setForm(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    };

    const handleSubmit = event => {
        event.preventDefault();
        setForm(prevState => ({
            ...prevState,
            amount: 0
        }))
        dispatch(createFund(form));
    };

    return (
        <Form className="buy-form pt-4 pb-3" onSubmit={handleSubmit}>
            <Container>
                <Form.Group as={Col}>
                    <h5>Banking</h5>
                </Form.Group>
                <hr/>

                <Form.Group as={Col} >
                    <Row>
                        <Form.Label column md={5}>Portfolio</Form.Label>
                        <Form.Label column md={7} className="text-right">{currentPortfolio.name}</Form.Label>
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
                        <Form.Label column md={5}>Type</Form.Label>
                        <Col md={7}>
                            <Form.Control
                                onChange={handleChange}
                                as="select"
                                name="category"
                            >
                                <option>Deposit</option>
                                <option>Withdrawal</option>
                            </Form.Control>
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
                        <Form.Label column md={7}>
                            <strong>Balance:</strong>
                        </Form.Label>
                        <Form.Label column md={5} className="text-right">
                            ${currentPortfolio.cash}
                            <br/>
                            {form.amount > 0 ? 
                            <small className={form.category === 'Deposit' ? 'pos' : 'neg'}>
                                {form.category === 'Deposit' ? `+` : `-`}${form.amount}
                            </small>
                            :
                            <br/>
                        }
                        </Form.Label>
                    </Row>
                </Form.Group>
            
                <Form.Group as={Col}>
                    <Button
                        block
                        variant="info" 
                        type="submit" 
                    >
                        {form.category}
                    </Button>
                </Form.Group>
            </Container>
        </Form>
    )
};