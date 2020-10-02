import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputGroup, Form, Col, Row, Container } from 'react-bootstrap';
import { createAndFetchNewActivity } from './activityActions';

export default function BuyForm({ ticker, name }) {
    const dispatch = useDispatch();
    const portfolios = useSelector(state => state.portfolio.portfolios);
    const stock = useSelector(state => state.stock.stock);
    const [form, setForm] = useState({
        portfolio_id: portfolios.length ? portfolios[0].id : null,
        category: 'Buy',
        name: name,
        ticker: ticker,
        price: stock.fundamental.lastPrice,
        shares: 0,
        date: moment().format('YYYY-MM-DD')
    });

    useEffect(() => {
        setForm({
            ...form,
            name: stock.name,
            ticker: stock.ticker,
            price: stock.fundamental.lastPrice
        })
    }, [stock])

    const handleClickAddActivity = event => {
        event.preventDefault();
        dispatch(createAndFetchNewActivity(form));
        setForm({
            ...form,
            shares: 0
        })
    };

    const handleChange = event => {
        event.persist();
        const {name, value} = event.target;

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const renderPortfolioOptions = () => {
        return portfolios.map(portfolio => 
        <option 
            value={portfolio.id} 
            key={portfolio.id}
        >
            {portfolio.name}
        </option>)
    };

    const renderRemainingCash = () => {
        const portfolio = portfolios.find((portfolio => portfolio.id === parseInt(form.portfolio_id)));
        return portfolio.cash - form.price * form.shares
    };

    const portfolioCash = () => {
        const portfolio = portfolios.find((portfolio => portfolio.id === parseInt(form.portfolio_id)));
        return portfolio.cash
    }

    return (
        <Form onSubmit={handleClickAddActivity} className="buy-form pt-4 pb-4">
            <Container>
                <Form.Group as={Col}>
                    <Col>
                        <h5>Buy {ticker}</h5>
                    </Col>
                </Form.Group>
                <hr/>

                <Form.Group as={Col} >
                    <Row>
                        <Form.Label column md={6}>Price</Form.Label>
                        <Col md={6}>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>$</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control onChange={handleChange} name='price' type="number" placeholder="Price" value={form.price} />
                            </InputGroup>
                        {/* <Form.Text muted>Price must not be negative.</Form.Text> */}
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group as={Col} >
                    <Row>
                        <Form.Label column md={6}>Shares</Form.Label>
                        <Col md={6}>
                            <Form.Control 
                                onChange={handleChange} 
                                name='shares' 
                                type="number" 
                                placeholder="Shares" 
                                value={form.shares} 
                                className="text-right"
                            />
                        {/* <Form.Text muted>Shares must not be negative.</Form.Text> */}
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group as={Col} >
                    <Row>
                        <Form.Label column md={5}>Portfolio</Form.Label>
                        <Col md={7}>
                            <Form.Control
                                onChange={handleChange}
                                as="select"
                                name="portfolio_id"
                            >
                            {renderPortfolioOptions()}
                            </Form.Control>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group as={Col} >
                    <Row>
                        <Form.Label column md={4}>Date</Form.Label>
                        <Col md={8}>
            
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
                            <strong>Total Cost:</strong>
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
                            <strong>
                                {portfolios.length ? 
                                    (renderRemainingCash() < 0 ? 
                                        `-$${Math.abs((Math.round((renderRemainingCash())*100)/100).toFixed(2))}`
                                        : 
                                        `$${(Math.round((renderRemainingCash())*100)/100).toFixed(2)}`)
                                    :
                                    '$0.00'
                                }
                            </strong>
                        </Form.Label>
                    </Row>
                </Form.Group>
            
                <Form.Group as={Col}>
                    <Button
                        block
                        variant="info" 
                        type="submit" 
                        disabled={portfolios.length && (form.price * form.shares) <= portfolioCash() ? false : true}
                    >
                        Buy
                    </Button>
                </Form.Group>
            </Container>
        </Form>
    )
}