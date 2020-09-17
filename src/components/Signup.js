import React, { useState } from 'react';

export default function Signup() {
    const [state, setState] = useState({
        username: "",
        password: "",
        password_confirmation: "",
    })
    
    return (
        <div>
            <form>
                <label>
                    Username
                    <input type="text" name="username" value={state.username} />
                </label>
                <br/>
                <label>
                    Password
                    <input type="password" name="password" value={state.password} />
                </label>
                <br/>
                <label>
                    Confirm Password
                    <input type="password" name="password_confirmation" value={state.password_confirmation} />
                </label>
                <br/>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};