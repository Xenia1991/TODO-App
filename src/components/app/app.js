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
   };

   getTaskId = () => {
      return Math.floor(Math.random()*1000);
   };

   makeComplited = (id) => {
      this.setState(( {todoData} ) => {
         const index = todoData.findIndex((el) => el.id===id);
         const elem = todoData.find((el) => el.id === id);
         const newElem = {
            ...elem,
            isCompleted: !elem.isCompleted,
         };

         const newArray = [
            ...todoData.slice(0, index), 
            newElem, 
            ...todoData.slice(index+1)
         ];

         return {
            todoData: newArray,
         };
      })
   };

   deleteTask = (id) => {
      this.setState(( {todoData} ) => {
         const index = todoData.findIndex((elem) => elem.id===id);
         const newArray = [...todoData.slice(0, index), ...todoData.slice(index+1)];

         return {
            todoData: newArray,
         }
      })
      
   };

   addInputValue = (text) => {
      this.setState({
         inputValue: text,
      });
   }

   addNewtask = () => {
      const newTask = {
         id: this.getTaskId(),
         name: this.state.inputValue,
         status: new Date(),
         isEditing: false,
         isCompleted: false,
      };

      this.setState(( {todoData}, inputValue ) => {
         const newTodos = [
            ...todoData,
            newTask
         ]
         return {
            todoData: newTodos,
            [inputValue]: this.addInputValue(''),
         }
      })
   }

   filterAll = () => {
      this.setState({
         filterFlag: 'all'
      });
   };

   filterActive = () => {
      this.setState({
         filterFlag: 'active'
      });
   };

   filterCompleted = () => {
      this.setState({
         filterFlag: 'completed'
      });
   };

   deleteAllCompletedTasks = () => {
      this.setState(( {todoData} ) => {
         const activeTasks = todoData.filter((todo) => {
            return !todo.isCompleted
         });
         return {
            todoData: activeTasks,
         }
      });
      
   }
   render() {
      return (
         <section className='todoapp'>
           < NewTaskForm onChange={this.addInputValue} 
                         onSubmit={this.addNewtask}
                         value={this.state.inputValue}
            />
           <section className='main'>
               <TaskList todos={this.state.todoData}
                         filterFlag={this.state.filterFlag}
                         onActive={this.makeComplited}
                         onDelete={this.deleteTask}
               />
               <Footer todos={this.state.todoData}
                       filterFlag={this.state.filterFlag}
                       onFilterAll={this.filterAll}
                       onFilterActive={this.filterActive}
                       onFilterCompleted={this.filterCompleted}
                       onDeletedAllCompleted={this.deleteAllCompletedTasks}
               />
           </section>
         </section>
      );
   };
};

export default App;