import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <div className="task-container">
                <TaskList />
            </div>
        </div>
    );
};

export default App;