import React from 'react';
import '../assets/css/TaskItem.css';

const TaskItem = ({ task, onEdit, onDelete, onComplete, onPending }) => {
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
                {task.status && (
                    <button onClick={() => onPending(task.id)}>Mark as Pending</button>
                )}
            </div>
            <p className="task-description">{task.description}</p>
        </li>
    );
};

export default TaskItem;
