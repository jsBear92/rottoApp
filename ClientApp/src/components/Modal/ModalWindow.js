import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ModalContent from './ModalContent';

const ModalWindow = ({data, changeValue, deleteTodo}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const quickDelete = (event, data) => {
        event.stopPropagation();
        deleteTodo(data.todoId);
    }

    return (
        <>   
            <div className='row-todo' onClick={handleShow}>
                <span className='todo-title'>{data.title}</span>
                <span className='todo-content'>{data.content}</span>
                <span className='todo-date'>{data.dueDate}</span>
            </div>
            <Button className="row-del" variant='danger' onClick={(e)=> quickDelete(e, data)}>Delete</Button>
            <Modal show={show} onHide={handleClose}>
                <ModalContent data={data} onClick={handleClose} changeValue={changeValue} deleteTodo={deleteTodo} />
            </Modal>
        </>
    );
}

export default ModalWindow;