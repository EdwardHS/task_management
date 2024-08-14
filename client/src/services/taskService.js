import axios from 'axios';

const API_URL = '/api/v1/tasks';

const getTasks = async () => {
    try {
        const response = await axios.get('/api/v1/tasks');
        console.log(response.data);
        if (Array.isArray(response.data.data)) {
            console.log("yes");
            return response.data.data; // Ensure it's an array
        } else {
            console.log("no");
            return []; // Return an empty array if the response is not what you expect
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return []; // Return an empty array on error
    }
};

const createTask = async (task) => {
    const response = await axios.post(API_URL, task);
    return response.data.data;
};

const updateTask = async (id, updatedTask) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data.data;
};

const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};

const markComplete = async (id) => {
    await axios.put(`${API_URL}/complete/${id}`);
};

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    markComplete,
};

export default taskService;