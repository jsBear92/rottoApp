import React, { useState, useEffect } from 'react';

import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './custom.css';

const Todo = () => {

    // Temp storage for comparison index
    const [comp, setComp] = useState("");

    // Modal data States
    const [title, setTitle] = useState([]);
    const [dueDate, setDueDate] = useState([]);
    const [content, setContent] = useState([]);

    // Todo api State
    const [todos, setTodos] = useState([])

    // Modal States
    const [show, setShow] = useState(false);

    // Attach data onto Modal and detach
    const handleClose = () => {
        setTitle([]);
        setContent([]);
        setDueDate([]);
        setShow(false);
    }
    const handleShow = (item) => {
        setTitle(item.title);
        setContent(item.content);
        setDueDate(item.dueDate);
        setShow(true);
        console.log(todos);
    }
    const handleChange = () => {
        const nextChange = [...todos];
        const newData = nextChange.find(
            a => a.title === comp || a.content === comp || a.dueDate === comp
        );
        newData.title = title;
        newData.content = content;
        newData.dueDate = dueDate;
        setTodos(nextChange);
        setShow(false);
    }

    // change datas of Modal
    const titleChange = (event) => {
        setTitle(event.target.value);
        setComp(event.target._wrapperState.initialValue);
        console.log(event);
    }
    const contentChange = event => {
        setContent(event.target.value);
        setComp(event.target._wrapperState.initialValue);
    }
    const dueDateChange = event => {
        setDueDate(event.target.value);
        setComp(event.target._wrapperState.initialValue);
        console.log(event);
    }

    // Add Todo
    const [inputValue, setInputValue] = useState('');
    const inputChange = event => {
        setInputValue(event.target.value);
    }
    const addInput = () => {
        let nextId = todos.length + 1;

        setTodos((todos) => ([...todos, {
            todoId: nextId++,
            title: inputValue,
            content: '',
            dueDate: '2023-01-13',
        }]));
    }


    // call api
    useEffect(() => {
        fetch("api/todo/GetTodos")
            .then(response => { return response.json() })
            .then(responseJson => {
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
                                <Modal.Title><input className='modal-input' onChange={(e) => titleChange(e)} value={title} /></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <h3>Content</h3>
                                    <input className='modal-input' onChange={contentChange} value={content} />
                                </div>
                                <div>
                                    <h4>Due Date</h4>
                                    <input className='modal-input' onChange={dueDateChange} value={dueDate} />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant='danger'>
                                    Delete
                                </Button>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button Button variant="primary" onClick={handleChange}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ))
            }
            <div className='row-input'>
                <Form.Control id='todo-input' type='text' placeholder='Add Todo' onChange={inputChange} />
                <Button className='add-button' variant='success' onClick={addInput}>Add</Button>
            </div>
        </Container>
    );
}

export default Todo;