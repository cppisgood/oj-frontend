import { useEffect, useState } from "react";
import { Button, Form, Modal, Alert, Container, Row } from "react-bootstrap"
import api from "./api"
import { ErrorBoundary } from 'react-error-boundary'

export function Register(props) {
    const [captcha, setCaptcha] = useState('');
    const [captchaBase64, setCaptchaBase64] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState('');

    const getCaptcha = () => {
        api.captcha((res) => {
            const s = 'data:image/png;base64,' + res.data.msg;
            setCaptchaBase64(s);
        })
    }
    useEffect(() => {
        getCaptcha();
    }, []);
    return (

        <div className="Register">
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={(e) => {
                            e.preventDefault()
                            if (!username) {
                                return setAlert("username is required")
                            }
                            if (!password) {
                                return setAlert("password is required")
                            }
                            if (!email) {
                                return setAlert("email is required")
                            }
                            if (!captcha) {
                                return setAlert("captcha is required")
                            }
                            if (password !== repeatPassword) {
                                return setAlert("password not match")
                            }
                            api.register(username, password, email, captcha, (res) => {
                                window.location.reload()
                            }, (e) => {
                                setAlert(e.response.data.msg)
                            });
                        }}>
                            <Form.Group>
                                <Form.Label> username: </Form.Label>
                                <Form.Control onChange={(e) => {
                                    setUsername(e.target.value);
                                }}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> email: </Form.Label>
                                <Form.Control onChange={(e) => {
                                    setEmail(e.target.value);
                                }}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> password: </Form.Label>
                                <Form.Control type='password' onChange={(e) => {
                                    setPassword(e.target.value);
                                }}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> repeat your password: </Form.Label>
                                <Form.Control type='password' onChange={(e) => {
                                    setRepeatPassword(e.target.value);
                                }}></Form.Control>
                            </Form.Group>
                            <Row>
                                <Form.Group>
                                    <Form.Label> captcha: </Form.Label>
                                    <Form.Control onChange={(e) => {
                                        setCaptcha(e.target.value)
                                    }}></Form.Control>
                                </Form.Group>
                                <ErrorBoundary FallbackComponent={() => {
                                    setAlert('failed to get captcha')
                                    return (<div> </div>)
                                }}>
                                    <div className='mt-1' onClick={() => {
                                        getCaptcha()
                                    }}>
                                        <img src={captchaBase64} alt="failed to get captcha"></img>
                                    </div>
                                </ErrorBoundary>
                            </Row>
                            <Row className='px-2'>
                                <Button className='mt-1' type='submit'>register</Button>
                            </Row>
                            <Row className='px-2'>
                                {
                                    alert && <Alert className='mt-2' variant="warning">
                                        {alert}
                                    </Alert>
                                }
                            </Row>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </div >
    )
}