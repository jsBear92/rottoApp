import React, { useState, useEffect } from 'react';

const Todo = () => {

    // 1 create useState
    const [todos, setTodos] = useState([])

    // 2 call api
    useEffect(() => {
        fetch("api/todo/GetTodos")
            .then(response => { return response.json() })
            .then(responseJson => {
                console.log(responseJson)
                setTodos(responseJson)
            })
    }, [])

    // 3 create
    return (
        <div className='container'>
            <h1>Todos</h1>
            <div className='row'>
                <div className='col-sm-12'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Content</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                todos.map((item) => (
                                    <tr>
                                        <td>{item.todoId}</td>
                                        <td>{item.title}</td>
                                        <td>{item.content}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Todo;