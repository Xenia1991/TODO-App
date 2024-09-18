import React from 'react';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

class App extends React.Component {
   state = {
      todoData: [
         {
            id: 1,
            name: 'Completed task',
            status: 'created 17 seconds ago',
            isEditing: false,
            isCompleted: false
         },
         {
            id: 2,
            name: 'Editing task',
            status: 'created 5 minutes ago',
            isEditing: true,
            isCompleted: false
         },
         {
            id: 3,
            name: 'Active task',
            status: 'created 5 minutes ago',
            isEditing: false,
            isCompleted: false,
         }
      ],
      inputValue: '',
   };

   getTaskId = () => {
      return Math.floor(Math.random()*1000);
   };

   filtersData = [
      {
         value: 'All',
         id: 1,
         isSelected: true
      },
      {
         value: 'Active',
         id: 2,
         isSelected: false
      },
      {
         value: 'Completed',
         id: 3,
         isSelected: false
      }
   ];

   clickHandler = (id) => {
      this.setState(( {todoData} ) => {
         const index = todoData.findIndex((el) => el.id===id);
         const elem = todoData.find((el) => el.id === id);
         elem.isCompleted = !elem.isCompleted;

         const newArray = [
            ...todoData.slice(0, index), 
            elem, 
            ...todoData.slice(index+1)
         ];
         return {
            todoData: newArray,
         };
      })
   };

   deleteHandler = (id) => {
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
         status: 'created right now',
         isEditing: false,
         isCompleted: false,
      };

      this.setState(( {todoData}, inputValue ) => {
         console.log(todoData, inputValue);
         
         const newTodos = [
            ...todoData,
            newTask
         ]
         return {
            todoData: newTodos,
            inputValue: this.addInputValue(''),
         }
      })
   }

   render() {
      return (
         <section className='todoapp'>
           < NewTaskForm onChange={this.addInputValue} 
                         onSubmit={this.addNewtask}
                         value={this.state.inputValue}
            />
           <section className='main'>
               <TaskList 
                  todos={this.state.todoData} 
                  onActive={this.clickHandler}
                  onDelete={this.deleteHandler} 
               />
               <Footer filters={this.filtersData}/>
           </section>
         </section>
      );
   };
};

export default App;