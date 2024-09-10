import React from 'react';
import ReactDOM from 'react-dom';

const TaskFilter = ({value, isSelected}) => {
    console.log(value, isSelected)
    return (
        <li>
            <button className={isSelected===true ? 'selected' : ''}>{value}</button>
        </li>
    );
};

export default TaskFilter;