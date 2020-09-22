import React from 'react';

export default function ActivityForm({ category }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClickAddActivity = event => {
        event.preventDefault();
        // dispatch(createNewActivity(name));
        handleClose();
    };

    const handleChange = event => {
        setName(event.target.value);
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Add Transaction
        </Button>
    
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add transaction</Modal.Title>
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
                            { category }
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal.Body>
        </Modal>
        </>
    )
}