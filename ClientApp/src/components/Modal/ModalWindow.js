import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import ModalContent from './ModalContent';

const ModalWindow = ({data, changeValue, deleteTodo}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>   
            <div className='row-todo' onClick={handleShow}>{data.title} {data.dueDate}</div>
            <Modal show={show} onHide={handleClose}>
                <ModalContent data={data} onClick={handleClose} changeValue={changeValue} deleteTodo={deleteTodo} />
            </Modal>
        </>
    );
}

export default ModalWindow;