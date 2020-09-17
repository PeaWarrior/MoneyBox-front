import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/userActions';

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
        <div>
            <form onSubmit={handleSubmit} >
                <label>
                    Username
                    <input 
                        onChange={handleChange} 
                        value={username}
                        autoComplete="username"
                        type="text" 
                        name="username" 
                    />
                </label>
                <br/>
                <label>
                    Password
                    <input 
                        onChange={handleChange} 
                        value={password} 
                        autoComplete="new-password"
                        type="password" 
                        name="password" 
                    />
                </label>
                <br/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};