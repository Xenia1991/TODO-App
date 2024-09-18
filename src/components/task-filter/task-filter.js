import React from 'react';

import './task-filter.css';

const TaskFilter = ({value, isSelected}) => {
    return (
        <li>
            <button className={isSelected===true ? 'selected' : ''}>
                {value}
            </button>
        </li>
    );
};

export default TaskFilter;