import React from 'react';

import TaskFilter from '../task-filter/task-filter';

import './footer.css';

const Footer = ({filters}) => {
    
    const filterItems = filters.map((item) => {
        const {value, id, isSelected} = item;
        return <TaskFilter value={value} key={id} isSelected={isSelected} />
    })

    return (
        <footer className="footer">
            <span className="todo-count">1 items left</span>
            <ul className="filters">
                {filterItems}
            </ul>
            <button className="clear-completed">Clear completed</button>
        </footer>
    )
};

export default Footer;