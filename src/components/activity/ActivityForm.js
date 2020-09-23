import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, InputGroup, Form, Col } from 'react-bootstrap';
import { createAndFetchNewActivity } from './activityActions';

export default function ActivityForm({ category, currentPrice, ticker, name }) {
    const dispatch = useDispatch();
    const { portfolios } = useSelector(state => state.portfolio); 
    const [form, setForm] = useState({
        portfolio_id: portfolios[0].id,
        category: category,
        name: name,
        ticker: ticker,
        price: currentPrice,
        shares: 0,
        date: moment().format('YYYY-MM-DD')
    });
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClickAddActivity = event => {
        event.preventDefault();
        dispatch(createAndFetchNewActivity(form));
        handleClose();
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
    }

    return (
        <>
        <Button 
            variant="primary" 
            onClick={handleShow}
            className="mr-3"
        >
            {category}
        </Button>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <div>
                    <Modal.Title>{name}</Modal.Title>
                    <span>{ticker}</span>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleClickAddActivity}>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Portfolio</Form.Label>
                            <Form.Control
                                onChange={handleChange}
                                as="select"
                                name="portfolio_id"
                            >
                                {renderPortfolioOptions()}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                                onChange={handleChange} 
                                name='date' 
                                type="date" 
                                placeholder="Date" 
                                value={form.date} 
                            />
                            {/* <Form.Text muted>Invalid date.</Form.Text> */}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend><InputGroup.Text>$</InputGroup.Text></InputGroup.Prepend>
                                <Form.Control onChange={handleChange} name='price' type="number" placeholder="Price" value={form.price} />
                            </InputGroup>
                            {/* <Form.Text muted>Price must not be negative.</Form.Text> */}
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label>Shares</Form.Label>
                            <Form.Control onChange={handleChange} name='shares' type="number" placeholder="Shares" value={form.shares} />
                            {/* <Form.Text muted>Shares must not be negative.</Form.Text> */}
                        </Form.Group>
                    </Form.Row>
                    
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={handleClose} >
                            Close
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" >
                            {category}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}