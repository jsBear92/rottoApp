import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalWindow = ({data, changeValue}) => {

    const [titleValue, setTitleValue] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = (index, title) => {
        changeValue(index, title);
        handleClose();
    }

    return (
        <>   
            <div className='row-todo' onClick={handleShow}>{data.title} {data.dueDate}</div>
            <Modal show={show} onHide={handleClose}>
                {/* <ModalContent data={data} onClick={handleClose} changeValue={onClick} /> */}
                <Modal.Header closeButton>
                <Modal.Title><input defaultValue={data.title} onChange={(e) => setTitleValue(e.target.value)} /></Modal.Title>
                </Modal.Header>
                <Modal.Body><input defaultValue={data.content} /></Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' type='submit'>Delete</Button>
                    <Button variant='primary' type='submit' onClick={() => handleClick(data.todoId, titleValue)}>Change</Button>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalWindow;