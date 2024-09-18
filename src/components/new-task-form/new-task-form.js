import React from 'react';

import './new-task-form.css';

class NewTaskForm extends React.Component {
    handleChange = (event) => {
        const value=event.target.value;
        this.props.onChange(value);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit();
    };

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <form onSubmit={this.handleSubmit}> 
                    <input className="new-todo" 
                        placeholder="What needs to be done?" 
                        autoFocus
                        value={this.props.value}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        );
    }
};

export default NewTaskForm;