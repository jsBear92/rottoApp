import React, { useState, useEffect } from 'react';
import ModalWindow from './Modal/ModalWindow'

import { Form, Button } from 'react-bootstrap';

const getCurrentDate = (separator='-') => {
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    return `${year}${separator}${month<10 ? `0${month+1}`:`${month+1}`}${separator}${date}`
}

const Todo = () => {
    // Todo api State
    const [todos, setTodos] = useState([])

    const [inputValue, setInputValue] = useState('');

    // call api
    useEffect(() => {
        fetch("api/todo/GetTodos")
            .then(response => { return response.json() })
            .then(responseJson => {
                setTodos(responseJson)
            })
    }, [])

    const handleClick = (index, newValue) => {
        const newArray = [...todos];
        newArray.find(i => i.todoId === index).title = newValue;
        setTodos(newArray);
    }
    

    return (
        <>
            { todos.map((item, i) => <ModalWindow key={i} changeValue={handleClick} data={item} />) }
            {/* Add Todo*/}
            <div className='row-input'>
                <Form.Control id='todo-input' type='text' placeholder='Add Todo' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Button className='add-button' variant='success' onClick={() => {
                    setInputValue('');
                    setTodos([
                        ...todos,
                        {
                            todoId: todos.length+1,
                            title: inputValue,
                            dueDate: getCurrentDate()
                        }
                    ]);
                }}>Add</Button>
           </div>
        </>
    );
}

export default Todo;