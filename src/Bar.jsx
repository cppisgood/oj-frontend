import { Container, Navbar, Nav, Button, ButtonGroup, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/user/userSlice'
import { useState } from "react"
import { Login } from './Login';
import api from './api';
import { Register } from './Register';

export function CheckLogin() {
    const dispatch = useDispatch();

    const username = useSelector(state => state.user.username);
    const expire_time = useSelector(state => state.user.expire_time);
    const now = Date.now() / 1000

    return (
        <div className="CheckLogin">
            {(username && now > expire_time) && dispatch(logout())}
        </div>
    )
}

export function Bar() {
    const dispatch = useDispatch();

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const username = useSelector(state => state.user.username);

    return (
        <div className="Bar">
            <CheckLogin></CheckLogin>
            <Navbar sticky="top" bg="light" expand="lg">
                <Container >
                    <Navbar.Brand href="/">NingOJ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">home</Nav.Link>
                            <Nav.Link href="/about">about</Nav.Link>
                        </Nav>

                        {
                            username ?
                                <NavDropdown title={username} variant='secondary'>
                                    <NavDropdown.Item href={`/user/${username}`}>
                                        profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={() => {
                                        dispatch(logout())
                                        api.logout()
                                    }}>
                                        logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                :
                                <ButtonGroup>
                                    <Button className='btn-login' onClick={() => { setShowLogin(true) }}>login</Button>
                                    <Button className='btn-register' onClick={() => { setShowRegister(true) }}>register</Button>
                                </ButtonGroup>
                        }

                        {
                            showLogin && <Login show={showLogin} handleClose={() => setShowLogin(false)}></Login>
                        }
                        {
                            showRegister && <Register show={showRegister} handleClose={() => setShowRegister(false)}></Register>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}