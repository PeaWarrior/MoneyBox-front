import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { createAndFetchNewTransaction, setTransactionInput } from './transactionActions';


export default function TransactionFundForm({name, portfolio_id}) {
    const dispatch = useDispatch();
    const { price, date } = useSelector(state => state.transaction.form);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(setTransactionInput({portfolio_id: portfolio_id}))
        dispatch(setTransactionInput({category: 'fund'}))
    }, [])
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = event => {
        dispatch(setTransactionInput({[event.target.name]: event.target.value}));
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(createAndFetchNewTransaction());
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
                            value={date}
                        />
                    </label>
                    <label>
                        Amount
                        <br/>
                        <input 
                            onChange={handleChange} 
                            type="number" 
                            name="price" 
                            value={price}
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