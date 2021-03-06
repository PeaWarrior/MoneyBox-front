import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { createNewPortfolio } from './portfolioActions';


export default function PortfolioForm() {
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClickCreateNewPortfolio = event => {
        event.preventDefault();
        dispatch(createNewPortfolio(name));
        handleClose();
    };

    const handleChange = event => {
        setName(event.target.value);
    }
      
    return (
        <>
        <Button variant="info" onClick={handleShow}>
            New Portfolio
        </Button>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create new portfolio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleClickCreateNewPortfolio}>
                    <label>
                        Name
                        <input 
                            onChange={handleChange} 
                            type="text" 
                            name="name" 
                            value={name} 
                        />
                    </label>
                    <Modal.Footer>
                        <Button 
                            variant="secondary" 
                            onClick={handleClose} >
                            Close
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit" >
                            Create Portfolio
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
      
}