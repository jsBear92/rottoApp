import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalContent = ({data, onClick, changeValue, deleteTodo}) => {

    const [titleValue, setTitleValue] = useState('');
    const [contentValue, setContentValue] = useState('');

    const handleClick = (index, title, content) => {
        changeValue(index, title, content);
        onClick();
    }

    const deleteClick = (index) => {
        deleteTodo(index);
        onClick();
    }


    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title><input defaultValue={data.title} onChange={(e) => setTitleValue(e.target.value)} /></Modal.Title>
            </Modal.Header>
            <Modal.Body><input defaultValue={data.content} onChange={(e) => setContentValue(e.target.value)} /></Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={() => deleteClick(data.todoId)} >Delete</Button>
                <Button variant='primary' onClick={() => handleClick(data.todoId, titleValue, contentValue)}>Change</Button>
                <Button variant='secondary' onClick={onClick}>Close</Button>
            </Modal.Footer>
        </>
    );
}

export default ModalContent;