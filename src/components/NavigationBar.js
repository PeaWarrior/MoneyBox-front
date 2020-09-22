import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../logo.png';

export default function NavigationBar() {
    const { currentUser } = useSelector(state => state.user)

    return (
        <nav>
            <img src={logo} alt="logo" className="logo" />
            <logo></logo>
            {currentUser ? 
                <>
                <NavLink to="/search">Search</NavLink>
                <button>Logout</button>
                </>
                :
                <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
                </>
            }
        </nav>
    )
}