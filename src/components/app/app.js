import React from 'react';
import ReactDOM from 'react-dom';

import NewTaskForm from '../new-task-form';

const App = () => {
   return (
      <section className='todoapp'>
        < NewTaskForm />
        <section className='main'>

        </section>
      </section>
   );
};

export default App;