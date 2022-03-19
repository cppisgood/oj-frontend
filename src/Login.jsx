import { useState } from "react";
import { Button, Form, Modal, Alert, Container, Row } from "react-bootstrap"
import { login } from "./features/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import api from "./api"
import { useNavigate } from "react-router-dom"

// export function RequireLogin() {
//     const navigate = useNavigate();
//     const username = useSelector(state => state.user.username);

//     return (
//         <div className='RequireLogin'>
//             {
//                 !username && <Modal>
//                     <Modal.body>
//                         {/* please */}
//                     </Modal.body>
//                 </Modal>
//             }
//         </div>
//     )
// }


export function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const dispatch = useDispatch()

    return (
        <div className="Login">
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={(e) => {
                            e.preventDefault()
                            api.login(username, password, rememberMe, (res) => {
                                dispatch(login({
                                    username: res.data.msg.username,
                                    expire_time: res.data.msg.expire_time
                                }))
                                window.location.reload();
                            }, (e) => {
                                setAlert(e.response.data.msg)
                            });
                        }}>
                            <Form.Group>
                                <Form.Label> username or email: </Form.Label>
                                <Form.Control onChange={(e) => {
                                    setUsername(e.target.value);
                                }}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label> password: </Form.Label>
                                <Form.Control type='password' onChange={(e) => {
                                    setPassword(e.target.value);
                                }}></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check type='checkbox' label='remember me' onChange={() => {
                                    setRememberMe(!rememberMe)
                                }}></Form.Check>
                            </Form.Group>
                            <Row className='px-2'>
                                <Button className='mt-1' type='submit'>login</Button>
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