/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

const TaskList = ({
  todos = [],
  value = 'editing task',
  filterFlag = 'All',
  onActive = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onChange = () => {},
  onSubmit = () => {},
  onPause = () => {},
  onPlay = () => {},
}) => {
  let filteredTodos = [...todos];

  if (filterFlag === 'active') {
    filteredTodos = filteredTodos.filter((todo) => !todo.isCompleted);
  }
  if (filterFlag === 'completed') {
    filteredTodos = filteredTodos.filter((todo) => todo.isCompleted);
  }
  const todosItems = filteredTodos.map((item) => {
    const { id, name, status, isEditing, isCompleted, minutes, seconds, isTimerOn } = item;
    return (
      <Task
        id={id}
        key={id}
        name={name}
        status={status}
        isEditing={isEditing}
        isCompleted={isCompleted}
        minutes={minutes}
        seconds={seconds}
        onClick={onActive}
        onDelete={onDelete}
        onEdit={onEdit}
        inputValue={value}
        onChange={onChange}
        onSubmit={onSubmit}
        onPause={onPause}
        onPlay={onPlay}
        isTimerOn={isTimerOn}
      />
    );
  });
  return <ul className="todo-list">{todosItems}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.instanceOf(Date).isRequired,
      isEditing: PropTypes.bool.isRequired,
      isCompleted: PropTypes.bool.isRequired,
    })
  ).isRequired,
  filterFlag: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onActive: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TaskList;
