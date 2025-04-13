import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

export async function getTasks() {
    try {
        const token = localStorage.getItem("authenticationToken");
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.tasks;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al obtener las tareas");
    }
}
