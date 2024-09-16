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
      ]
   }

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
   ]

   clickHandler = (id) => {
      this.setState(( {todoData} ) => {
         console.log(todoData, id);
         
         const index = todoData.findIndex((el) => el.id===id);
         const elem = todoData.find((el) => el.id === id);
         elem.isCompleted = !elem.isCompleted
         const before = todoData.slice(0, index);
         const after = todoData.slice(index+1);
         const newArray = [...before, elem, ...after];
         return {
            todoData: newArray,
         }
      })
   }  

   render() {
      return (
         <section className='todoapp'>
           < NewTaskForm />
           <section className='main'>
               <TaskList todos={this.state.todoData} onActive={this.clickHandler}/>
               <Footer filters={this.filtersData}/>
           </section>
         </section>
      );
   }
};

export default App;