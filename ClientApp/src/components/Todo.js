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

    // Change Todo
    const handleClick = (index, newValue) => {
        const newArray = [...todos];
        newArray.find(i => i.todoId === index).title = newValue;
        setTodos(newArray);
    }

    // Delete Todo
    const deleteTodo = (index) => {
        setTodos(todos.filter(t => t.todoId !== index));
    }

    const check = (todo) => {
        if (todo.length === 0)
            return 1;
        else if (todo.length === 1)
            return 2;
        else
            return todo.map(t => t.todoId).reduce((a, b) => Math.max(a, b))+1;
    }
    

    return (
        <>
            { todos.map((item, i) => <ModalWindow key={i} changeValue={handleClick} deleteTodo={deleteTodo} data={item} />) }
            {/* Add Todo*/}
            <div className='row-input'>
                <Form.Control id='todo-input' type='text' placeholder='Add Todo' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <Button className='add-button' variant='success' onClick={() => {
                    setInputValue('');
                    setTodos([
                        ...todos,
                        {
                            todoId: check(todos),
                            title: inputValue,
                            content: '',
                            dueDate: getCurrentDate()
                        }
                    ]);
                }}>Add</Button>
           </div>
           <button onClick={()=>console.log(todos)}>Click</button>
        </>
    );
}

export default Todo;