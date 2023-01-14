import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalContent = ({data, onClick, changeValue, deleteTodo}) => {

    const [titleValue, setTitleValue] = useState('');

    const handleClick = (index, title) => {
        changeValue(index, title);
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
            <Modal.Body><input defaultValue={data.content} /></Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={() => deleteClick(data.todoId)} >Delete</Button>
                <Button variant='primary' onClick={() => handleClick(data.todoId, titleValue)}>Change</Button>
                <Button variant='secondary' onClick={onClick}>Close</Button>
            </Modal.Footer>
        </>
    );
}

export default ModalContent;