import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { createAndFetchNewActivity, setActivityInput } from './activityActions';

export default function ActivityFundForm({name, portfolio_id, portfolioIndex}) {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        portfolio_id: portfolio_id,
        category: 'fund',
        price: 0,
        date: moment().format('YYYY-MM-DD')
    });

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handleChange = event => {
        event.persist();
        setForm(prevForm => ({
            ...prevForm,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(createAndFetchNewActivity(form, portfolioIndex));
        handleClose();
    }
      
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Add Funds
        </Button>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} >
                    <label>
                        Date
                        <br/>
                        <input 
                            onChange={handleChange} 
                            type="date" 
                            name="date" 
                            value={form.date}
                        />
                    </label>
                    <label>
                        Amount
                        <br/>
                        <input 
                            onChange={handleChange} 
                            type="number" 
                            name="price" 
                            value={form.price}
                        />
                    </label>
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={handleClose} >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" >
                            Add Funds
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
      
}