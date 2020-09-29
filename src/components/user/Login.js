import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './userActions';
import { Container, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Signup() {
    const { username, password } = useSelector(state => state.user.form);
    const dispatch = useDispatch();

    const handleChange = event => {
        const action = {
            type: 'SET_INPUT',
            payload: {[event.target.name]: event.target.value}
        }
        dispatch(action);
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(login());
    }
    
    return (
        <Container className="form-container">
            <div className="text-center">
                <h2>MoneyBox</h2>
            </div>
            <br/>
            <br/>
            <Form onSubmit={handleSubmit} >
                <Form.Group>
                    <Form.Control 
                        onChange={handleChange} 
                        value={username}
                        autoComplete="username"
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        onChange={handleChange} 
                        value={password}
                        autoComplete="password"
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                    />
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Control 
                        type="submit" 
                        value="Login"
                        className="btn-info"
                    />
                </Form.Group>
            </Form>
            <Container className="text-center">
                    <span>Don't have an account?</span>
                    <br/>
                    <NavLink to="/signup">Sign Up</NavLink>
            </Container>
        </Container>
    );
};