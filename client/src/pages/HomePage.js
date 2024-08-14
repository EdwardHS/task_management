import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h2>Welcome to Task Manager</h2>
            <Link to="/tasks">View Tasks</Link>
        </div>
    );
};

export default HomePage;
