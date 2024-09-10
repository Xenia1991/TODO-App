import React from 'react';

import Task from '../task/task';
import './task-list.css';

const TaskList = ( {todos} ) => {

    const todosItems = todos.map((item) => {
        const {id, value, status, isEditing, isComplited} = item;
        return <Task id={id} key={id} value={value} status={status} isEditing={isEditing} isComplited={isComplited}/>;
    });
    return (
        <ul className='todo-list'>
            {todosItems}
        </ul>
    );
};

export default TaskList;