import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { fetchStockData } from './stockActions';

export default function StockSearch() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');

    const handleChange = event => {
        setQuery(event.target.value)
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(fetchStockData(query));
    };
    
    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup>
                <input onChange={handleChange} value={query} placeholder="Search symbol" />
                <InputGroup.Append>
                    <Button variant="outline-secondary" type="submit"><i className="fas fa-search"></i></Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}