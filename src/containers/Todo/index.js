import React, { useState } from 'react'
import { Button, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ListGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import { SET_VALUE } from './types';
import Draggable from 'react-draggable';

const Todo = (props) => {
    const dispatch = useDispatch();

    const value = useSelector(state => state.value);
    const data = useSelector(state => state.tasks);

    // const {value, data} = useSelector(state => state);

    const typing = (event) => {
        const action = { type: SET_VALUE, payload: event.target.value };
        dispatch(action);
    }
    const add = () => {
        const action = { type: "ADD_TASK", payload: value }
        dispatch(action);
    }

    const deleteTask = (index) => {
        const action = { type: "DELETE_TASK", payload: index };
        dispatch(action);
    }
    const deleteAll = (index) => {
        const action = { type: "DELETE_ALL", payload: index };
        dispatch(action);
    }

    const editTask = (value, index) => {
        const action = { type: "EDIT_TASK", payload: { value, index } };
        dispatch(action)
    }

    const up = (index) => {
        const action = { type: "UP", payload: index };
        dispatch(action);
    }

    const down = (index) => {
        const action = { type: "DOWN", payload: index };
        dispatch(action);
    }
    const toggleCompleted = (index) => {
        const action = { type: "TOGGLE_COMPLETED", payload: index };
        dispatch(action);
    }
    const keyPress = (event) =>{
        const  code = event.keyCode || event.which
        if (code === 13)
                add()
        }

        let num=null
        return (

            <div className="bg-white rounded p-3 shadow">
            <h1>Todo App</h1>

            <div className="d-flex mb-2">
                <Input placeholder="new task" onKeyPress={(value)=>keyPress(value)} className="me-2" value={value} onChange={typing} />
                <Button color="primary" onClick={add}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
            <ListGroup>

                {data?.map((value, index) => {
                    num=index+1
                    return (
                        <Item
                        value={value}
                        index={index}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        up={up}
                        down={down}
                        add={add}
                        toggleCompleted={toggleCompleted} />
                        )})}
            </ListGroup>
            <div className="d-flex  justify-content-between w-100">
                        <p className='fw-bold fs-5 mt-4'>All: <span className='badge bg-primary'>{num}</span></p>
                        <button onClick={deleteAll} className='btn btn-danger h-25 my-auto d-inline-block'>Delete All</button>
                        </div>
        </div>
    )
}

export default Todo;