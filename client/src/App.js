import React from 'react';
import TaskPage from './pages/TaskPage';
import './assets/css/App.css';

const App = () => {
    return (
        <div className="container">
            <h1>Task Manager</h1>
            <TaskPage />
        </div>
    );
};

export default App;
