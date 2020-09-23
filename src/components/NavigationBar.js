import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../logo.png';
import { logout } from './user/userActions';

export default function NavigationBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser } = useSelector(state => state.user);

    const handleClickLogOut = event => {
        dispatch(logout());
        history.push({
            pathname: '/'
        })
    }

    return (
        <nav>
            <img src={logo} alt="logo" className="logo" />
            {currentUser ? 
                <>
                <NavLink to="/search">Search</NavLink>
                <button onClick={handleClickLogOut} >Logout</button>
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