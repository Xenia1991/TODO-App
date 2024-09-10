import React from 'react';
import ReactDOM from 'react-dom';

import TaskFilter from '../task-filter/task-filter';

const Footer = ({filters}) => {
    console.log(filters);
    
    const filterItems = filters.map((item) => {
        console.log('hi');
        console.log(item);
        
        const {value, id, isSelected} = item;

        return <TaskFilter value={value} key={id} isSelected={isSelected} />
    })
    console.log(filterItems);
    
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