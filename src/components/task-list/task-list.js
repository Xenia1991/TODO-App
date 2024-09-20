import React from 'react';

import Task from '../task/task';
import './task-list.css';
import PropTypes from 'prop-types';

class TaskList extends React.Component {

    render() {
        const {filterFlag} = this.props;
        let filteredTodos = [...this.props.todos];
        
        if (filterFlag === 'active') {
            filteredTodos= filteredTodos.filter((todo) => !todo.isCompleted)
        }
        if (filterFlag === 'completed') {
            filteredTodos= filteredTodos.filter((todo) => todo.isCompleted)
        }
        const todosItems = filteredTodos.map((item) => {
            const {id, name, status, isEditing, isCompleted} = item;
            return (
                <Task 
                    id={id} 
                    key={id} 
                    name={name} 
                    status={status} 
                    isEditing={isEditing} 
                    isCompleted={isCompleted}
                    onClick={this.props.onActive}
                    onDelete={this.props.onDelete}
                />
            );
        });
        
        return (
            <ul className='todo-list'>
                {todosItems}
            </ul>
        );
    };
};

TaskList.defaultProps = {
    todos: [],
    filterflag: 'All',
};

TaskList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    filterFlag: PropTypes.string,
};

export default TaskList;