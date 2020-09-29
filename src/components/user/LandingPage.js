import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../logo.png';
import Login from './Login';

export default function LandingPage() {
    return (
        <section className="section hero-section">
            <Container className="d-flex align-items-center">
                <Row className="d-flex align-items-center">
                    <Col>
                        <Row>
                            <Col className="p-0">
                                <h1>Money Box</h1>
                                <h2>Stock Portfolio Manager</h2>
                            </Col>
                            <Col className="p-0">
                                <img src={logo} alt="MoneyBox logo" className="landing-logo" />
                            </Col>
                        </Row>
                        <Row>
                            <p className="text-justify">
                                Whether you are actively trading or investing for the long term, keeping track of your stock portfolio just got easier. See real-time quotes and recent news of all US Exchange listed stocks with a click of a button. Join now and start keeping track of your portfolio for free.
                            </p>
                        </Row>
                    </Col>
                    <Col lg={4}>
                        <Login />
                    </Col>
                </Row>
            </Container>

        </section>
    )
}