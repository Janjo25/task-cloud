import axios from "axios";

const API_URL = "http://localhost:3000/files";

export async function deleteFile(fileId) {
    try {
        const token = localStorage.getItem("authenticationToken");
        const response = await axios.delete(
            `${API_URL}/${fileId}`,
            {headers: {Authorization: `Bearer ${token}`}},
        );

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al eliminar el archivo.");
    }
}

export async function getFiles() {
    try {
        const token = localStorage.getItem("authenticationToken");
        const response = await axios.get(
            API_URL,
            {headers: {Authorization: `Bearer ${token}`}},
        );

        return response.data.files;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al obtener los archivos.");
    }
}

export async function uploadFile(formData) {
    try {
        const token = localStorage.getItem("authenticationToken");
        const response = await axios.post(
            API_URL,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al subir el archivo.");
    }
}
