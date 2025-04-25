import axios from "axios";

const API_URL = "http://task-cloud-clb-1438915362.us-east-1.elb.amazonaws.com/files";

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
    console.log("🐻");

    try {
        console.log("🟡 Subiendo a Lambda...");
        const s3Response = await axios.post(
            "https://ee9dyhimqd.execute-api.us-east-1.amazonaws.com/prod/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("🟢 Respuesta Lambda:", s3Response.data);

        const s3Url = s3Response.data.url;
        const file = formData.get("file");
        const token = localStorage.getItem("authenticationToken");

        console.log("🟡 Registrando en backend...");
        const backendResponse = await axios.post(
            "http://task-cloud-clb-1438915362.us-east-1.elb.amazonaws.com/files/register-s3",
            {
                originalName: file.name,
                mimeType: file.type,
                url: s3Url,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("🟢 Registrado:", backendResponse.data);

        return backendResponse.data;

    } catch (error) {
        console.error("🔴 Error:", error);
        throw new Error(error.response?.data?.error || "Error inesperado.");
    }
}
