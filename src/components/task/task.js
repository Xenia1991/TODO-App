import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

class Task extends React.Component {
  render() {
    const { name, id, status, isCompleted, isEditing, onClick, onDelete } = this.props;
    if (isEditing) {
      return (
        <li className="editing">
          <div className="view">
            <input className="toggle" type="checkbox" checked={isCompleted} onClick={() => onClick(id)} />
            <label onClick={() => onClick(id)}>
              <span className="description">{name}</span>
              <span className="created">{status}</span>
            </label>
            <button aria-label="edit form" type="button" className="icon icon-edit" />
            <button
              aria-label="delete form"
              type="button"
              className="icon icon-destroy"
              onClick={() => {
                onDelete(id);
              }}
            />
          </div>
          <input type="text" className="edit" />
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
          <label onClick={() => onClick(id)}>
            <span className="description">{name}</span>
            <span className="created">
              {`created ${formatDistanceToNow(status, {
                includeSeconds: true,
                addSuffix: true,
              })}`}
            </span>
          </label>
          <button aria-label="edit form" type="button" className="icon icon-edit" />
          <button aria-label="delete form" type="button" className="icon icon-destroy" onClick={() => onDelete(id)} />
        </div>
      </li>
    );
  }
}

Task.defaultProps = {
  name: 'To da something',
  id: 1001,
  isEditing: false,
  isCompleted: false,
  onClick: () => [],
  onDelete: () => [],
};

Task.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  isEditing: PropTypes.bool,
  isCompleted: PropTypes.bool,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Task;
