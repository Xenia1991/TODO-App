import React from 'react';
import ReactDOM from 'react-dom';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';

const App = () => {

   const todoData = [
      {
         id: 1,
         value: 'Completed task',
         status: 'created 17 seconds ago',
         isEditing: false,
         isCompleted: true
      },
      {
         id: 2,
         value: 'Editing task',
         status: 'created 5 minutes ago',
         isEditing: true,
         isCompleted: false
      },
      {
         id: 3,
         value: 'Active task',
         status: 'created 5 minutes ago',
         isEditing: false,
         isCompleted: false,
      }
   ];

   return (
      <section className='todoapp'>
        < NewTaskForm />
        <section className='main'>
            <TaskList todos={todoData}/>
        </section>
      </section>
   );
};

export default App;