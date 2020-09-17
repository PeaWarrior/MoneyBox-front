import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavigationBar() {
    return (
        <nav>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
        </nav>
    )
}