import React, { useState, useEffect } from 'react';
import TaskDialog from '../components/TaskDialog';
import taskService from '../services/taskService';
import '../assets/css/TaskPage.css';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        taskService.getTasks().then(data => setTasks(data));
    };

    const handleCreate = () => {
        setCurrentTask(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (task) => {
        setCurrentTask(task);
        setIsDialogOpen(true);
    };

    const handleSave = (taskData) => {
        if (currentTask) {
            taskService.updateTask(currentTask.id, taskData).then(() => {
                fetchTasks();
            });
        } else {
            const newTask = { ...taskData, timestamp: new Date(), completed: false };
            taskService.createTask(newTask).then(() => {
                fetchTasks(); 
            });
        }
        fetchTasks();
        setIsDialogOpen(false);
    };

    const handleDelete = (id) => {
        taskService.deleteTask(id).then(() => {
            fetchTasks();
        });
        setIsDialogOpen(false);
    };

    const handleMarkComplete = (id) => {
        taskService.markComplete(id).then(() => {
            fetchTasks();
        });
        setIsDialogOpen(false);
    };

    const handleMarkPending = (id) => {
        taskService.markPending(id).then(() => {
            fetchTasks(); 
        });
        setIsDialogOpen(false);
    };

    const sortedTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="task-page">
            <div className="task-controls">
                <button onClick={handleCreate} className="create-task-button">Create Task</button>
            </div>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="title-column">Title</th>
                        <th className="description-column">Description</th>
                        <th className="status-column">Status</th>
                        <th className="created-column">Created Date</th>
                        <th className="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map((task, index) => (
                        <tr key={task.id}>
                            <td>{index + 1}</td>
                            <td className="title-column" onClick={() => handleEdit(task)}>{task.title}</td>
                            <td className="description-column">{task.description}</td>
                            <td className="status-column">{task.status ? 'Completed' : 'Pending'}</td>
                            <td className="created-column">
                                {new Date(task.createdAt).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                    hour12: true
                                }).replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2')}
                            </td>
                            <td className="actions-column">
                                <div className="action-buttons">
                                    <button onClick={() => handleEdit(task)}>Edit</button>
                                    <button onClick={() => handleDelete(task.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TaskDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={handleSave}
                onDelete={handleDelete} 
                onMarkComplete={handleMarkComplete}
                onMarkPending={handleMarkPending}
                initialTask={currentTask}
            />
        </div>
    );
};

export default TaskPage;
