/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

const Task = ({
  name = 'To do something',
  status = new Date(),
  isCompleted = false,
  isEditing = false,
  minutes = '',
  seconds = '',
  onClick = () => {},
  onDelete = () => {},
  onChange = () => {},
  onSubmit = () => {},
  id = 1001,
  onPlay = () => {},
  onPause = () => {},
  onEdit = () => {},
  inputValue = 'editing task',
}) => {
  const [isOn, setIsOn] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(id);
  };

  const handlePlay = () => {
    setIsOn(true);
    onPlay(id);
  };

  const handlePause = () => {
    setIsOn(false);
    onPause(id);
  };

  const handleComplitedClick = () => {
    setIsOn(false);
    onClick(id);
  };

  if (isEditing) {
    return (
      <li className="editing">
        <div className="view"> </div>
        <form onSubmit={handleSubmit}>
          <input type="text" className="edit" value={inputValue} onChange={handleChange} />
        </form>
      </li>
    );
  }
  return (
    <li className={isCompleted ? 'completed' : ''}>
      <div className="view">
        <input
          className="toggle"
          checked={isCompleted}
          type="checkbox"
          onClick={() => handleComplitedClick(id)}
          onChange={(e) => e.target.checked}
        />
        <label>
          <span className="title" onClick={() => onClick(id)}>
            {name}
          </span>
          <span className="description timer">
            <button
              type="button"
              className="icon icon-play"
              onClick={() => handlePlay(id)}
              disabled={isCompleted || isOn}
            />
            <button type="button" className="icon icon-pause" onClick={() => handlePause(id)} disabled={isCompleted} />
            {Number(minutes) !== 0 || Number(seconds) !== 0 ? `    ${minutes}:${seconds}` : '    Time is over!'}
          </span>
          <span className="description">
            {`created ${formatDistanceToNow(status.toString(), {
              includeSeconds: true,
              addSuffix: true,
            })}`}
          </span>
        </label>
        <button
          aria-label="edit form"
          type="button"
          className="icon icon-edit"
          onClick={() => onEdit(id)}
          disabled={isCompleted}
        />
        <button aria-label="delete form" type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
      </div>
    </li>
  );
};

Task.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  status: PropTypes.instanceOf(Date).isRequired,
  inputValue: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Task;
