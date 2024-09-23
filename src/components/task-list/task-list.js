import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

class TaskList extends React.Component {
  render() {
    const { todos, filterFlag, onActive, onDelete } = this.props;
    let filteredTodos = [...todos];

    if (filterFlag === 'active') {
      filteredTodos = filteredTodos.filter((todo) => !todo.isCompleted);
    }
    if (filterFlag === 'completed') {
      filteredTodos = filteredTodos.filter((todo) => todo.isCompleted);
    }
    const todosItems = filteredTodos.map((item) => {
      const { id, name, status, isEditing, isCompleted } = item;
      return (
        <Task
          id={id}
          key={id}
          name={name}
          status={status}
          isEditing={isEditing}
          isCompleted={isCompleted}
          onClick={onActive}
          onDelete={onDelete}
        />
      );
    });
    return <ul className="todo-list">{todosItems}</ul>;
  }
}

TaskList.defaultProps = {
  todos: [],
  filterFlag: 'All',
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string,
      isEditing: PropTypes.bool,
      isCompleted: PropTypes.bool,
    })
  ),
  filterFlag: PropTypes.string,
};

export default TaskList;
