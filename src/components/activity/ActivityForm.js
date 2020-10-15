import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, InputGroup, Form, Col, Row } from 'react-bootstrap';
import { createAndFetchNewActivity } from './activityActions';

export default function ActivityForm({ category, currentPrice, ticker, name, shares }) {
    const dispatch = useDispatch();
    const { currentPortfolio } = useSelector(state => state.portfolio); 
    const [form, setForm] = useState({
        portfolio_id: currentPortfolio.id,
        category: category,
        name: name,
        ticker: ticker,
        price: currentPrice,
        shares: (shares ? shares : 0),
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

    const renderRemainingCash = () => {
        return currentPortfolio.cash - form.price * form.shares
    };

    const checkDisabled = () => {
        if (category === 'Sell' && form.shares <= shares) {
            return false
        } else if (category === 'Buy' && form.price * form.shares <= currentPortfolio.cash) {
            return false
        } else {
            return true
        }
    }

    return (
        <>
        <Button 
            variant="info" 
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
                            <Form.Label>{currentPortfolio.name}</Form.Label>
                        </Form.Group>
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
                    

                    <Form.Group as={Col}>
                    <Row>
                        <Form.Label column>
                            <strong>{category === 'Buy' ? 'Total Cost:' : 'New Balance'}</strong>
                        </Form.Label>
                        <Form.Label column className="text-right">
                            {category === 'Buy' ? 
                            <strong>${(Math.round((form.price * form.shares)*100)/100).toFixed(2)}</strong>
                            :
                            <strong>${(Math.round((parseInt(currentPortfolio.cash) + (form.price * form.shares))*100)/100).toFixed(2)}</strong>
                            }
                        </Form.Label>
                    </Row>
                </Form.Group>

                {category === 'Buy' ?
                <Form.Group as={Col}>
                    <Row>
                        <Form.Label column md={7}>
                            <strong>Remaining Cash:</strong>
                        </Form.Label>
                        <Form.Label column md={5} className="text-right">
                            <strong>
                                {(renderRemainingCash() < 0 ? 
                                    `-$${Math.abs((Math.round((renderRemainingCash())*100)/100).toFixed(2))}`
                                    : 
                                    `$${(Math.round((renderRemainingCash())*100)/100).toFixed(2)}`)
                                }
                            </strong>
                        </Form.Label>
                    </Row>
                </Form.Group>
                :
                null
                }
                    
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={handleClose} >
                            Close
                        </Button>
                        <Button 
                            variant="info" 
                            type="submit" 
                            disabled={checkDisabled()}
                        >
                            {category}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}