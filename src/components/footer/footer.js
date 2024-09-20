import React from 'react';

import './footer.css';

class Footer extends React.Component {

    render() {
        const { filterFlag,
                onFilterAll,
                onFilterActive,
                onFilterCompleted, 
                onDeletedAllCompleted,
                todos 
        } = this.props;
        const leftTasks = todos.filter((todo) => {
            return !todo.isCompleted;
        });
        
        return (
            <footer className="footer">
                <span className="todo-count">{leftTasks.length} items left</span>
                <ul className="filters">
                    <li onClick={onFilterAll}>
                        <button className={filterFlag === 'all' ? 'selected' : ''}>
                           All
                        </button>
                    </li>
                    <li onClick={onFilterActive}>
                        <button className={filterFlag === 'active' ? 'selected' : ''}>
                            Active
                        </button>
                    </li>
                    <li onClick={onFilterCompleted}>
                        <button className={filterFlag === 'completed' ? 'selected' : ''}>
                            Completed
                        </button>
                    </li>
                </ul>
                <button className="clear-completed"
                        onClick={onDeletedAllCompleted}>
                            Clear completed
                </button>
            </footer>
        )
    }
};

Footer.defaultProps = {

};

Footer.propTypes = {

};

export default Footer;