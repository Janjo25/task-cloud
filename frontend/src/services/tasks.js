import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

export async function createTask({title, description}) {
    try {
        const token = localStorage.getItem("authenticationToken");
        const response = await axios.post(
            API_URL,
            {title, description},
            {headers: {Authorization: `Bearer ${token}`}},
        );

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al crear la tarea.");
    }
}

export async function getTasks() {
    try {
        const token = localStorage.getItem("authenticationToken");
        const response = await axios.get(
            API_URL,
            {headers: {Authorization: `Bearer ${token}`}},
        );

        return response.data.tasks;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al obtener las tareas.");
    }
}

export async function toggleCompletion(taskId) {
    try {
        const token = localStorage.getItem("authenticationToken");
        const response = await axios.patch(
            `${API_URL}/${taskId}/toggle`,
            {},
            {headers: {Authorization: `Bearer ${token}`}},
        );

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al cambiar el estado de la tarea");
    }
}

export async function updateTask(taskId, {title, description}) {
    try {
        const token = localStorage.getItem("authenticationToken");
        const response = await axios.patch(
            `${API_URL}/${taskId}`,
            {title, description},
            {headers: {Authorization: `Bearer ${token}`}},
        );

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al actualizar la tarea.");
    }
}
