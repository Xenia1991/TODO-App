/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  handleChange = (event) => {
    const { onChange } = this.props;
    const { value } = event.target;
    onChange(value);
  };

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    event.preventDefault();
    onSubmit();
  };

  render() {
    const { value } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit} className="new-todo-form">
          <input className="new-todo" placeholder="What needs to be done?" value={value} onChange={this.handleChange} />
          <input className="new-todo-form__timer" placeholder="Min" />
          <input className="new-todo-form__timer" placeholder="Sec" />
          <button type="submit" />
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  value: 'New task is here',
  onChange: (text) => text,
  onSubmit: () => [],
};

NewTaskForm.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default NewTaskForm;
