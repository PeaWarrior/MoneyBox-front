import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Signup() {
    const { username, password, password_confirmation } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleChange = event => {
        const action = {
            type: 'SET_INPUT',
            payload: {[event.target.name]: event.target.value}
        }
        dispatch(action);
    }
    
    return (
        <div>
            <form>
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
                <label>
                    Confirm Password
                    <input 
                        onChange={handleChange} 
                        value={password_confirmation} 
                        autoComplete="new-password" 
                        type="password" 
                        name="password_confirmation" 
                    />
                </label>
                <br/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};