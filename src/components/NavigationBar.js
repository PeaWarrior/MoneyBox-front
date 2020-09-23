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
            </Navbar.Brand>
            <Nav className="mr-auto">
                {currentUser ? 
                <>
                <NavLink to="/" className="nav-link">Portfolios</NavLink>
                <NavLink to="/search" className="nav-link">Search</NavLink>
                </>
                :
                <></>
                }
            </Nav>

            {currentUser ? 
                <Nav className="ml-auto">
                    <Button onClick={handleClickLogOut} >Logout</Button>
                </Nav>
                :
                <Nav className="ml-auto">
                    <NavLink to="/login" className="nav-link"><Button>Login</Button></NavLink>
                    <NavLink to="/signup" className="nav-link"><Button>Signup</Button></NavLink>
                </Nav>
            }
            </Container>
        </Navbar>
    )
}