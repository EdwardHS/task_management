import React from 'react';
import '../assets/css/TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onComplete }) => {
    return (
        <li className="task-item">
            <div className="task-header">
                <span className="task-title">{task.title}</span>
                <span className="task-status">{task.status ? "Completed" : "Pending"}</span>
                <button onClick={() => onEdit(task.id)}>Edit</button>
                <button onClick={() => onDelete(task.id)}>Delete</button>
                {!task.status && (
                    <button onClick={() => onComplete(task.id)}>Mark as Complete</button>
                )}
            </div>
            <p className="task-description">{task.description}</p>
        </li>
    );
};

export default TaskItem;
