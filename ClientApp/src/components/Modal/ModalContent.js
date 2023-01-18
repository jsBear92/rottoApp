import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

const ModalContent = ({data, onClick, changeValue, deleteTodo}) => {

    const [startDate, setStartDate] = useState(new Date());

    const [inputValues, setInputValues] = useState({
        title: '',
        content: '',
        dueDate: ''
    });

    const handleTitle = (e) => {
        inputValues.title = e.target.value;
    }

    const handleContent = (e) => {
        inputValues.content = e.target.value;
    }

    const handleDate = (e) => {
        inputValues.dueDate = e.target.value;
    }

    const handleClick = (index) => {
        changeValue(index, inputValues);
        onClick();
    }

    const deleteClick = (index) => {
        deleteTodo(index);
        onClick();
    }

    const pressEnter = (e, index) => {
        if (e.key === "Enter") {
            handleClick(index);
        }
    }

    const test = () => {
        console.log(Date.parse(data.dueDate));
        console.log(startDate);
        console.log(Date.parse(startDate));
    }
    


    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title><input className="modal-input" defaultValue={data.title} onKeyDown={(e) => pressEnter(e, data.todoId)} onChange={(e) => handleTitle(e)} /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input className="modal-input" defaultValue={data.content} onKeyDown={(e) => pressEnter(e, data.todoId)} onChange={(e) => handleContent(e)} />
                <DatePicker className="modal-input" dateFormat={'yyyy-MM-dd'} selected={startDate} onChange={(date) => setStartDate(date)} />
                <input className="modal-input" defaultValue={data.dueDate} onKeyDown={(e) => pressEnter(e, data.todoId)} onChange={(e) => handleDate(e)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={() => deleteClick(data.todoId)} >Delete</Button>
                <Button variant='primary' onClick={() => handleClick(data.todoId)}>Change</Button>
                <Button variant='secondary' onClick={onClick}>Close</Button>
                <button onClick={test}></button>
            </Modal.Footer>
        </>
    );
}

export default ModalContent;