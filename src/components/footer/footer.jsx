import React from 'react';
import PropTypes from 'prop-types';
import './footer.css';

const Footer = ({
  filterFlag = 'all',
  onFilterAll = () => {},
  onFilterActive = () => {},
  onFilterCompleted = () => {},
  onDeletedAllCompleted = () => {},
  todos = [],
}) => {
  const leftTasks = todos.filter((todo) => !todo.isCompleted);
  const leftString = ' items left';
  return (
    <footer className="footer">
      <span className="todo-count">
        {leftTasks.length}
        {leftString}
      </span>
      <ul className="filters">
        <li onClick={onFilterAll}>
          <button type="button" className={filterFlag === 'all' ? 'selected' : ''}>
            All
          </button>
        </li>
        <li onClick={onFilterActive}>
          <button type="button" className={filterFlag === 'active' ? 'selected' : ''}>
            Active
          </button>
        </li>
        <li onClick={onFilterCompleted}>
          <button type="button" className={filterFlag === 'completed' ? 'selected' : ''}>
            Completed
          </button>
        </li>
      </ul>
      <button type="button" className="clear-completed" onClick={onDeletedAllCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
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
  onFilterAll: PropTypes.func.isRequired,
  onFilterActive: PropTypes.func.isRequired,
  onFilterCompleted: PropTypes.func.isRequired,
  onDeletedAllCompleted: PropTypes.func.isRequired,
};

export default Footer;
