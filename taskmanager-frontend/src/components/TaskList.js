import React, { useState, useEffect } from 'react';
import '../App.css';
import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus } from 'react-icons/fa';
import { getTasks, createTask, updateTask, deleteTask } from '../api/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newTask, setNewTask] = useState({ taskName: '', taskDescription: '' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const handleAdd = async () => {
        if (newTask.taskName && newTask.taskDescription) {
            try {
                await createTask(newTask);
                fetchTasks(); // Refresh the task list
                setNewTask({ taskName: '', taskDescription: '' });
                setIsAdding(false);
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setNewTask(tasks[index]);
    };

    const handleSave = async (index) => {
        try {
            await updateTask(tasks[index].id, newTask);
            fetchTasks();
            setEditingIndex(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleCancel = () => {
        setEditingIndex(null);
        setNewTask({ taskName: '', taskDescription: '' });
        setIsAdding(false);
    };

    const handleDelete = async (index) => {
        try {
            await deleteTask(tasks[index].id);
            fetchTasks();
            if (editingIndex === index) {
                setEditingIndex(null);
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="task-list-container">
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Task Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={task.id}>
                            <td>
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        name="taskName"
                                        value={newTask.taskName}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    task.taskName
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <input
                                        type="text"
                                        name="taskDescription"
                                        value={newTask.taskDescription}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    task.taskDescription
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <>
                                        <FaSave onClick={() => handleSave(index)} />
                                        <FaTimes onClick={handleCancel} />
                                    </>
                                ) : (
                                    <>
                                        <FaEdit onClick={() => handleEdit(index)} />
                                        <FaTrash onClick={() => handleDelete(index)} />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    {isAdding && (
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="taskName"
                                    value={newTask.taskName}
                                    placeholder="Task Name"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="taskDescription"
                                    value={newTask.taskDescription}
                                    placeholder="Task Description"
                                    onChange={handleChange}
                                />
                            </td>
                            <td>
                                <FaSave onClick={handleAdd} />
                                <FaTimes onClick={handleCancel} />
                            </td>
                        </tr>
                    )}
                    {!isAdding && (
                        <tr>
                            <td colSpan="3" className="add-row">
                                <FaPlus onClick={() => setIsAdding(true)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;