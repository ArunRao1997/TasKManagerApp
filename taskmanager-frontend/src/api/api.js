import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/tasks/';

export const getTasks = () => axios.get(API_BASE_URL);
export const createTask = (task) => axios.post(API_BASE_URL, task);
export const updateTask = (id, task) => axios.put(`${API_BASE_URL}${id}/`, task);
export const deleteTask = (id) => axios.delete(`${API_BASE_URL}${id}/`);