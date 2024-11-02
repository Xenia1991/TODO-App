/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({
  inputValue = '',
  minValue,
  secValue,
  onChange = (text) => text,
  onMinutesChange,
  onSecondsChange,
  onSubmit = () => [],
}) => {
  const handleChangeTask = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  const handleChangeMin = (event) => {
    const { value } = event.target;
    onMinutesChange(value);
  };

  const handleChangeSec = (event) => {
    const { value } = event.target;
    if (value <= 59) {
      onSecondsChange(value);
    } else {
      onSecondsChange('59');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={handleChangeTask}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          maxLength={3}
          onChange={handleChangeMin}
          value={minValue}
        />
        <input
          className="new-todo-form__timer"
          type="number"
          min="0"
          max="59"
          placeholder="Sec"
          onChange={handleChangeSec}
          value={secValue}
        />
        <button type="submit" />
      </form>
    </header>
  );
};

NewTaskForm.propTypes = {
  inputValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
