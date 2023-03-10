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

    const handleAddTodo = () => {
        const newTodo = {todoId: check(todos), title: inputValue, content: '', dueDate: getCurrentDate()};
        setInputValue('');
        setTodos([...todos, newTodo]);
        handleSubmit(newTodo);
    }

    const handleSubmit = (item) => {
        fetch('/api/todo/PostTodos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        });
    }

    // Change Todo
    const handleClick = (index, arr) => {
        const newArray = [...todos];
        const newT = newArray.find(t => t.todoId === index);
        if (arr.title !== '' && arr.content !== '' && arr.dueDate !== '') {
            newT.title = arr.title;
            newT.content = arr.content;
            newT.dueDate = arr.dueDate;
        } else if (arr.title !== '' && arr.content !== '') {
            newT.title = arr.title;
            newT.content = arr.content;
        } else if (arr.title !== '' && arr.dueDate !== '') {
            newT.title = arr.title;
            newT.dueDate = arr.dueDate;
        } else if (arr.content !== '' && arr.dueDate !== '') {
            newT.content = arr.content;
            newT.dueDate = arr.dueDate;
        } else if (arr.title !== '') {
            newT.title = arr.title;
        } else if (arr.content !== '') {
            newT.content = arr.content;
        } else if (arr.duDate !== '') {
            newT.dueDate = arr.dueDate;
        }
        setTodos(newArray);
        changeTodo(index, newT);
    }

    const changeTodo = async (id, todo) => {
        fetch(`/api/todo/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(todo)
        })
        .then (data => console.log(data))
        .catch (e => console.log(e));
    }

    // Delete Todo
    const deleteTodo = (index) => {
        setTodos(todos.filter(t => t.todoId !== index));
        handleDelete(index);
        console.log(index);
    }
    const handleDelete = async (id) => {
        fetch(`/api/todo/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'}
        })
        .then (data => console.log(data))
        .catch (e => console.log(e));
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
                <Button className='add-button' variant='success' onClick={handleAddTodo}>Add</Button>
           </div>
        </>
    );
}

export default Todo;