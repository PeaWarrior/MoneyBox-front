import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import { signup } from './userActions';

export default function Signup() {
    const { username, password, password_confirmation } = useSelector(state => state.user.form);
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
        dispatch(signup());
    }
    
    return (
        <Container className="signup-container d-flex align-items-center">
            <Container className="form-container signup">
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
                            autoComplete="new-password"
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control 
                            onChange={handleChange} 
                            value={password_confirmation}
                            autoComplete="new-password"
                            type="password" 
                            name="password_confirmation" 
                            placeholder="Confirm Password" 
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Control 
                            type="submit" 
                            value="Sign Up"
                            className="btn-info"
                        />
                    </Form.Group>
                </Form>
                <Container className="text-center">
                    Already have an account?
                    <br/>
                    <NavLink to="/">Log In</NavLink>
                </Container>
            </Container>
        </Container>


        // <div>
        //     <form onSubmit={handleSubmit} >
        //         <label>
        //             Username
        //             <input 
        //                 onChange={handleChange} 
        //                 value={username}
        //                 autoComplete="username"
        //                 type="text" 
        //                 name="username" 
        //             />
        //         </label>
        //         <br/>
        //         <label>
        //             Password
        //             <input 
        //                 onChange={handleChange} 
        //                 value={password} 
        //                 autoComplete="new-password"
        //                 type="password" 
        //                 name="password" 
        //             />
        //         </label>
        //         <br/>
        //         <label>
        //             Confirm Password
        //             <input 
        //                 onChange={handleChange} 
        //                 value={password_confirmation} 
        //                 autoComplete="new-password" 
        //                 type="password" 
        //                 name="password_confirmation" 
        //             />
        //         </label>
        //         <br/>
        //         <button type="submit">Signup</button>
        //     </form>
        // </div>
    );
};