import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalContent = ({data, onClick, changeValue, deleteTodo}) => {

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


    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title><input defaultValue={data.title} onChange={(e) => handleTitle(e)} /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input defaultValue={data.content} onChange={(e) => handleContent(e)} />
                <input defaultValue={data.dueDate} onChange={(e) => handleDate(e)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={() => deleteClick(data.todoId)} >Delete</Button>
                <Button variant='primary' onClick={() => handleClick(data.todoId)}>Change</Button>
                <Button variant='secondary' onClick={onClick}>Close</Button>
            </Modal.Footer>
        </>
    );
}

export default ModalContent;