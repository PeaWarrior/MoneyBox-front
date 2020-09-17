import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function NavigationBar() {
    const { currentUser } = useSelector(state => state.user)

    return (
        <nav>
            {currentUser ? 
                <>
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