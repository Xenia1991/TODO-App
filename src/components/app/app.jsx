/* eslint-disable max-len */
import React from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

class App extends React.Component {
  state = {
    todoData: [],
    filterFlag: 'all',
    inputValue: '',
    inputMin: '',
    inputSec: '',
    editInputValue: '',
  };

  getTaskId = () => Math.floor(Math.random() * 1000);

  makeComplited = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const elem = todoData.find((el) => el.id === id);
      const newElem = {
        ...elem,
        isCompleted: !elem.isCompleted,
        isTimerOn: false,
        timerId: [elem.isCompleted || elem.isTimerOn ? clearInterval(elem.timerId) : elem.timerId],
      };

      const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(() => {
      const { todoData } = this.state;
      const currentTask = todoData.filter((todo) => todo.id === id);
      const [task] = currentTask;

      return {
        timerId: clearInterval(task.timerId),
      };
    });
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((elem) => elem.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addInputValue = (text) => {
    this.setState({
      inputValue: text,
    });
  };

  addMinutesValue = (text) => {
    this.setState({
      inputMin: text,
    });
  };

  addSecondsValue = (text) => {
    this.setState({
      inputSec: text,
    });
  };

  addNewtask = () => {
    const { inputValue, inputMin, inputSec } = this.state;

    if (inputValue && inputMin && inputSec) {
      const newTask = {
        id: this.getTaskId(),
        name: inputValue.trim(),
        status: new Date(),
        isEditing: false,
        isCompleted: false,
        minutes: Number(inputMin),
        seconds: Number(inputSec),
        timerId: null,
        isTimerOn: false,
      };
      this.setState(({ todoData }) => {
        const newTodos = [...todoData, newTask];
        return {
          todoData: newTodos,
          inputMin: '',
          inputSec: '',
          inputValue: '',
        };
      });
    }
  };

  filterAll = () => {
    this.setState({
      filterFlag: 'all',
    });
  };

  filterActive = () => {
    this.setState({
      filterFlag: 'active',
    });
  };

  filterCompleted = () => {
    this.setState({
      filterFlag: 'completed',
    });
  };

  deleteAllCompletedTasks = () => {
    this.setState(({ todoData }) => {
      const activeTasks = todoData.filter((todo) => !todo.isCompleted);
      return {
        todoData: activeTasks,
      };
    });
  };

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const elem = todoData.find((el) => el.id === id);
      const newElem = {
        ...elem,
        isEditing: !elem.isEditing,
      };

      const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
        editInputValue: newElem.name,
      };
    });
  };

  editInputValue = (text) => {
    this.setState({
      editInputValue: text,
    });
  };

  changeTask = (id) => {
    const { editInputValue } = this.state;

    if (editInputValue.trim()) {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        const elem = todoData.find((el) => el.id === id);
        const newElem = {
          ...elem,
          name: editInputValue.trim(),
          isEditing: !elem.isEditing,
        };
        const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
        return {
          todoData: newArray,
          editInputValue: '',
        };
      });
    }
  };

  pauseTimer = (id) => {
    const { todoData } = this.state;
    const currentTask = todoData.filter((todo) => todo.id === id);
    const [task] = currentTask;
    const index = todoData.findIndex((el) => el.id === id);
    const newTask = {
      ...task,
      timerId: clearInterval(task.timerId),
      isTimerOn: false,
    };
    const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
    this.setState({
      todoData: newArray,
    });
  };

  startTimer = (id) => {
    const setTimer = setInterval(() => {
      const { todoData } = this.state;
      const currentTask = todoData.filter((todo) => todo.id === id);
      const index = todoData.findIndex((el) => el.id === id);
      const [task] = currentTask;
      const newTask = {
        ...task,
        minutes: [
          Number(task.minutes) !== 0 && Number(task.seconds) === 0 ? Number(task.minutes) - 1 : Number(task.minutes),
        ],
        seconds: [Number(task.seconds) !== 0 ? Number(task.seconds) - 1 : '59'],
        timerId: [Number(task.minutes) === 0 && Number(task.seconds) === 1 ? clearInterval(task.timerId) : setTimer],
        isTimerOn: true,
      };
      const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
      this.setState({
        todoData: newArray,
      });
    }, 1000);
  };

  render() {
    const { todoData, inputValue, filterFlag, editInputValue, inputMin, inputSec } = this.state;
    return (
      <section className="todoapp">
        <NewTaskForm
          onChange={this.addInputValue}
          onMinutesChange={this.addMinutesValue}
          onSecondsChange={this.addSecondsValue}
          onSubmit={this.addNewtask}
          minValue={inputMin}
          secValue={inputSec}
          value={inputValue}
        />
        <section className="main">
          <TaskList
            todos={todoData}
            filterFlag={filterFlag}
            onActive={this.makeComplited}
            onDelete={this.deleteTask}
            onEdit={this.editTask}
            value={editInputValue}
            onChange={this.editInputValue}
            onSubmit={this.changeTask}
            onPause={this.pauseTimer}
            onPlay={this.startTimer}
          />
          <Footer
            todos={todoData}
            filterFlag={filterFlag}
            onFilterAll={this.filterAll}
            onFilterActive={this.filterActive}
            onFilterCompleted={this.filterCompleted}
            onDeletedAllCompleted={this.deleteAllCompletedTasks}
          />
        </section>
      </section>
    );
  }
}

export default App;
