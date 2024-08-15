import React, { useState, useEffect } from 'react';
import '../assets/css/TaskDialog.css';

const TaskDialog = ({ isOpen, onClose, onSave, onDelete, onMarkComplete, onMarkPending,initialTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    useEffect(() => {
        if (initialTask) {
            setTitle(initialTask.title || '');
            setDescription(initialTask.description || '');
            setStatus(initialTask.status ? 'Completed' : 'Pending');
            setCreatedAt(new Date(initialTask.createdAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }).replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2'));
            setUpdatedAt(new Date(initialTask.updatedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }).replace(/(\d{2})\/(\d{2})\/(\d{4}),/, '$3-$1-$2'));
        } else {
            setTitle('');
            setDescription('');
            setStatus('Pending');
            setCreatedAt('');
            setUpdatedAt('');
        }
    }, [initialTask]);

    const handleSave = () => {
        onSave({ title, description, status: status === 'Completed' });
        setTitle('');
        setDescription('');
        onClose();
    };

    const handleDelete = () => {
        if (initialTask && onDelete) {
            onDelete(initialTask.id);
        }
        onClose();
    };

    const handleMarkComplete = () => {
        if (initialTask && onMarkComplete) {
            onMarkComplete(initialTask.id);
        }
        onClose();
    };

    const handleMarkPending = () => {
        if (initialTask && onMarkPending) {
            onMarkPending(initialTask.id);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog-content">
                <div className="dialog-header">
                    <h2>{initialTask ? 'Edit Task' : 'Create Task'}</h2>
                    {initialTask && initialTask.status === 0 && (
                        <button onClick={handleMarkComplete} className="btn-mark-complete">
                            Mark as Complete
                        </button>
                    )}
                    {initialTask && initialTask.status === 1 && (
                        <button onClick={handleMarkPending} className="btn-mark-pending">
                            Mark as Pending
                        </button>
                    )}
                </div>
                <div className="dialog-body">
                    <div className="form-row">
                        <div className="col-md-6">
                            <label>Title</label>
                            <input
                                disabled={initialTask && initialTask.status === 1 ? true : false}
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Description</label>
                            <textarea
                                disabled={initialTask && initialTask.status === 1 ? true : false}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <label>Status</label>
                            <input
                                type="text"
                                value={status}
                                disabled
                            />
                        </div>
                    </div>
                    {initialTask && <div className="form-row">
                        <div className="col-md-6">
                            <label>Created At</label>
                            <input
                                type="text"
                                value={createdAt}
                                disabled
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Updated At</label>
                            <input
                                type="text"
                                value={updatedAt}
                                disabled
                            />
                        </div>
                    </div>}
                </div>
                <div className="dialog-footer">
                    {initialTask && <button onClick={handleDelete} className="btn-delete">Delete</button>}
                    <button onClick={onClose} className="btn-cancel">Cancel</button>
                    <button onClick={handleSave} className="btn-save">Save</button>
                </div>
            </div>
        </div>
    );
};

export default TaskDialog;
