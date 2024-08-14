import React from 'react';
import TaskItem from './TaskItem';
import '../assets/css/TaskPage.css';

const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => {
    if (tasks.length === 0) {
        return <p className="no-tasks-message">No Available Tasks</p>;
    }

    // Group tasks by date
    const groupedTasks = tasks.reduce((groups, task) => {
        const date = new Date(task.createdAt).toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(task);
        return groups;
    }, {});

    return (
        <div className="task-list">
            {Object.keys(groupedTasks).map(date => (
                <div key={date} className="task-group">
                    <h3 className="task-group-date">{date}</h3>
                    <ul>
                        {groupedTasks[date].map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onComplete={onComplete}
                            />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
