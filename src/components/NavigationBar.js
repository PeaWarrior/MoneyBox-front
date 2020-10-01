import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
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
        <Navbar>
            <Container>
            <Navbar.Brand href="/">
                <img
                    src={logo}
                    className="logo"
                    alt="MoneyBox logo"
                />
                <span className="logo-name">MoneyBox</span>
            </Navbar.Brand>
            <Nav className="mr-auto">
                {currentUser ? 
                <>
                <NavLink exact to="/" className="nav-link">Portfolios</NavLink>
                <NavLink exact to="/search" className="nav-link">Search</NavLink>
                </>
                :
                <></>
                }
            </Nav>

            <Nav className="ml-auto">
                <Button onClick={handleClickLogOut} variant="outline-info">Logout</Button>
            </Nav>
            </Container>
        </Navbar>
    )
}