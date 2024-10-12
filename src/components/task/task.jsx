/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

class Task extends React.Component {
  handleChange = (event) => {
    const { onChange } = this.props;
    const { value } = event.target;
    onChange(value);
  };

  handleSubmit = (event) => {
    const { onSubmit, id } = this.props;
    event.preventDefault();
    onSubmit(id);
  };

  render() {
    const {
      name,
      id,
      status,
      isCompleted,
      isEditing,
      minutes,
      seconds,
      isTimerOn,
      onClick,
      onDelete,
      onEdit,
      value,
      onPause,
      onPlay,
    } = this.props;
    if (isEditing) {
      return (
        <li className="editing">
          <div className="view"> </div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="edit" value={value} onChange={this.handleChange} />
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
            onClick={() => onClick(id)}
            onChange={(e) => e.target.checked}
          />
          <label>
            <span className="title" onClick={() => onClick(id)}>
              {name}
            </span>
            <span className="description">
              <button
                type="button"
                className="icon icon-play"
                onClick={() => onPlay(id)}
                disabled={isCompleted || isTimerOn}
              />
              <button type="button" className="icon icon-pause" onClick={() => onPause(id)} disabled={isCompleted} />
              {Number(minutes) !== 0 || Number(seconds) !== 0 ? `${minutes}:${seconds}` : 'Time is over!'}
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
  }
}

Task.defaultProps = {
  name: 'To do something',
  id: 1001,
  isEditing: false,
  isCompleted: false,
  status: new Date(),
  value: 'editing task',
  onClick: () => {},
  onDelete: () => {},
  onEdit: () => {},
  onChange: () => {},
  onSubmit: () => {},
};

Task.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  isEditing: PropTypes.bool,
  isCompleted: PropTypes.bool,
  status: PropTypes.instanceOf(Date),
  value: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Task;
