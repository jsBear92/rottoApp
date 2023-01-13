import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './custom.css';

const Todo = () => {

    // Modal States
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setTitle([]);
        setContent([]);
        setDueDate([]);
        setShow(false);
    }
    const handleShow = (item) => {
        console.log(item);
        setTitle(item.title);
        setContent(item.content);
        setDueDate(item.dueDate);
        setShow(true);
    }

    // Modal data States
    const [title, setTitle] = useState([]);
    const [dueDate, setDueDate] = useState([]);
    const [content, setContent] = useState([]);

    // Todo api State
    const [todos, setTodos] = useState([])

    // call api
    useEffect(() => {
        fetch("api/todo/GetTodos")
            .then(response => { return response.json() })
            .then(responseJson => {
                console.log(responseJson)
                setTodos(responseJson)
            })
    }, [])

    return (
        <Container>
            <Row className='table-head'>
                <Col sm={1}></Col>
                <Col sm={8}>Todo</Col>
                <Col sm={3}>Due Date</Col>
            </Row>
            {
                todos.map((item) => (
                    <div key={item.todoId}>
                        <Row className='row-todo' onClick={() => handleShow(item)}>
                            <Col sm={1}></Col>
                            <Col sm={8}>{item.title}</Col>
                            <Col sm={3}>{item.dueDate}</Col>
                        </Row>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>{content}</p>
                                <p>{dueDate}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant='danger'>
                                    Delete
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ))
            }
        </Container>
    );
}

export default Todo;