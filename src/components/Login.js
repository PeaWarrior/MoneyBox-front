import React, { useState } from 'react';

export default function Login() {
    const [state, setState] = useState({
        username: "",
        password: "",
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};