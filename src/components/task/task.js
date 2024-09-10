import React from 'react';
import ReactDOM from 'react-dom';

const Task = ( {id, value, status, isEditing, isCompleted} ) => {
    if (isEditing) {
        return (
            <li className='editing'>
                <div className="view">
                    <input className="toggle" type="checkbox"/>
                    <label>
                        <span className="description">{value}</span>
                        <span className="created">{status}</span>
                    </label>
                    <button className="icon icon-edit"></button>
                    <button className="icon icon-destroy"></button>
                </div>
                <input type="text" class="edit" value="Editing task" />
            </li>
        )
    }
    return (
        <li className={isCompleted===true ? 'completed' : '' }>
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span className="description">{value}</span>
                    <span className="created">{status}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
        </li>
    )
};

export default Task;