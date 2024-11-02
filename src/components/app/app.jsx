import React, { useState } from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

const App = () => {
  const [todoData, setTodoData] = useState([]);
  const [filterFlag, setFilterFlag] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [inputMin, setInputMin] = useState('');
  const [inputSec, setInputSec] = useState('');
  const [editInputValue, setEditInputValue] = useState('');

  const getTaskId = () => Math.floor(Math.random() * 1000);

  const makeComplited = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const elem = todoData.find((el) => el.id === id);
    const newElem = {
      ...elem,
      isCompleted: !elem.isCompleted,
      isTimerOn: false,
      timerId: [elem.isCompleted || elem.isTimerOn ? clearInterval(elem.timerId) : elem.timerId],
    };

    const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
    setTodoData(newArray);
  };

  const deleteTask = (id) => {
    // this.setState(() => {
    //   const { todoData } = this.state;
    //   const currentTask = todoData.filter((todo) => todo.id === id);
    //   const [task] = currentTask;

    //   return {
    //     timerId: clearInterval(task.timerId),
    //   };
    // });
    const index = todoData.findIndex((elem) => elem.id === id);
    const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
    setTodoData(newArray);
  };

  const addInputValue = (text) => {
    setInputValue(text);
  };

  const addMinutesValue = (text) => {
    if (Number(text) < 10) {
      setInputMin(`0${Number(text)}`);
    } else {
      setInputMin(`${Number(text)}`);
    }
  };

  const addSecondsValue = (text) => {
    if (Number(text) < 10) {
      setInputSec(`0${Number(text)}`);
    } else {
      setInputSec(`${Number(text)}`);
    }
  };

  const addNewtask = () => {
    if (inputValue && inputMin && inputSec) {
      const newTask = {
        id: getTaskId(),
        name: inputValue.trim(),
        status: new Date(),
        isEditing: false,
        isCompleted: false,
        minutes: inputMin,
        seconds: inputSec,
        timerId: null,
        isTimerOn: false,
      };
      const newTodos = [...todoData, newTask];
      setTodoData(newTodos);
      setInputMin('');
      setInputSec('');
      setInputValue('');
    }
  };

  const filterAll = () => {
    setFilterFlag('all');
  };

  const filterActive = () => {
    setFilterFlag('active');
  };

  const filterCompleted = () => {
    setFilterFlag('completed');
  };

  const deleteAllCompletedTasks = () => {
    const activeTasks = todoData.filter((todo) => !todo.isCompleted);
    setTodoData(activeTasks);
  };

  const editTask = (id) => {
    const index = todoData.findIndex((el) => el.id === id);
    const elem = todoData.find((el) => el.id === id);
    const newElem = {
      ...elem,
      isEditing: !elem.isEditing,
    };
    const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
    setTodoData(newArray);
    setEditInputValue(newElem.name);
  };

  const editInput = (text) => {
    setEditInputValue(text);
  };

  const changeTask = (id) => {
    if (editInputValue.trim()) {
      const index = todoData.findIndex((el) => el.id === id);
      const elem = todoData.find((el) => el.id === id);
      const newElem = {
        ...elem,
        name: editInputValue.trim(),
        isEditing: !elem.isEditing,
      };
      const newArray = [...todoData.slice(0, index), newElem, ...todoData.slice(index + 1)];
      setTodoData(newArray);
      setEditInputValue('');
    }
  };

  const pauseTimer = (id) => {
    const currentTask = todoData.filter((todo) => todo.id === id);
    const [task] = currentTask;
    const index = todoData.findIndex((el) => el.id === id);
    const newTask = {
      ...task,
      timerId: clearInterval(task.timerId),
      isTimerOn: false,
    };
    const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
    setTodoData(newArray);
  };

  const formatMinutes = (minutes, seconds) => {
    let mins = '';
    if (Number(seconds) !== 0 && Number(minutes) < 10) {
      mins = `0${Number(minutes)}`;
    } else if (Number(seconds) === 0 && Number(minutes) < 10) {
      mins = `0${Number(minutes) - 1}`;
    } else if (Number(seconds) === 0 && Number(minutes) === 10) {
      mins = `0${Number(minutes) - 1}`;
    } else if (Number(seconds) === 59 && Number(minutes) < 10) {
      mins = `0${Number(minutes)}`;
    } else if (Number(seconds) === 0 && Number(minutes) >= 10) {
      mins = `${Number(minutes) - 1}`;
    } else {
      mins = `${Number(minutes)}`;
    }
    return mins;
  };

  const formatSeconds = (seconds) => {
    let sec = '';
    if (Number(seconds) > 0 && Number(seconds) <= 10) {
      sec = `0${Number(seconds) - 1}`;
    } else if (Number(seconds) === 0) {
      sec = '59';
    } else {
      sec = `${Number(seconds) - 1}`;
    }
    return sec;
  };

  const startTimer = (id) => {
    const setTimer = setInterval(() => {
      const currentTask = todoData.filter((todo) => todo.id === id);
      const index = todoData.findIndex((el) => el.id === id);
      const [task] = currentTask;
      const mins = formatMinutes(task.minutes, task.seconds);
      const sec = formatSeconds(task.seconds);
      const newTask = {
        ...task,
        minutes: mins,
        seconds: sec,
        timerId: Number(task.minutes) === 0 && Number(task.seconds) === 1 ? clearInterval(task.timerId) : setTimer,
        isTimerOn: true,
      };
      const newArray = [...todoData.slice(0, index), newTask, ...todoData.slice(index + 1)];
      setTodoData(newArray);
    }, 1000);
  };

  return (
    <section className="todoapp">
      <NewTaskForm
        onChange={addInputValue}
        onMinutesChange={addMinutesValue}
        onSecondsChange={addSecondsValue}
        onSubmit={addNewtask}
        minValue={inputMin}
        secValue={inputSec}
        inputValue={inputValue}
      />
      <section className="main">
        <TaskList
          todos={todoData}
          filterFlag={filterFlag}
          onActive={makeComplited}
          onDelete={deleteTask}
          onEdit={editTask}
          value={editInputValue}
          onChange={editInput}
          onSubmit={changeTask}
          onPause={pauseTimer}
          onPlay={startTimer}
        />
        <Footer
          todos={todoData}
          filterFlag={filterFlag}
          onFilterAll={filterAll}
          onFilterActive={filterActive}
          onFilterCompleted={filterCompleted}
          onDeletedAllCompleted={deleteAllCompletedTasks}
        />
      </section>
    </section>
  );
};

export default App;
