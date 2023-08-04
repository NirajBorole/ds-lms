import React, { useState, useContext } from 'react'
import { Modal, Button, InputGroup, FormControl, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context'

interface ModalProps {
    text: string,
    isSignUpFlow: Boolean
}

function ModalComponant({ text, isSignUpFlow }: ModalProps) {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [state, setState] = useContext(UserContext);
    const navigate = useNavigate()

    const handleClick = async () => {
        let response;
        if (isSignUpFlow) {
            const { data: registerData } = await axios.post("http://localhost:4400/auth/signup", {
                email,
                password
            })
            response = registerData
        } else {
            const { data: loginData } = await axios.post("http://localhost:4400/auth/login", {
                email,
                password
            })
            response = loginData
        }

        if (response.errors.length) {
            setErrMsg(response.errors[0].msg)
        }

        setState({
            data: {
                id: response.data.user.id,
                email: response.data.user.email,
                customerStripeId: response.data.user.customerStripeID
            },
            loading: false,
            error: null
        });

        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer &{response.data.token}`
        navigate("/course");
    }

    return (
        <>
            <Button onClick={handleShow} style={{ padding: "0.5rem 4rem" }}>
                {text}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        {text}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text>
                            Email
                        </InputGroup.Text>
                        <FormControl type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>
                            Password
                        </InputGroup.Text>
                        <FormControl type='password' value={password} onChange={(e) => setPass(e.target.value)} />
                    </InputGroup>
                    {errMsg && <Alert key='danger' variant='danger'>{errMsg}</Alert>}
                    <Button variant='primary' onClick={handleClick}>
                        {text}
                    </Button>
                    <Button variant='danger' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalComponant