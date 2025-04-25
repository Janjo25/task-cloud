import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import "./RegisterPage.css";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        email: "A@A.com",
        password: "A",
        confirmPassword: "A",
        profileImage: null,
        username: "A",
    });
    const [success, setSuccess] = useState(null);

    const handleChange = (event) => {
        const {files, name, value} = event.target;

        setForm({
            ...form,
            [name]: name === "profileImage" ? files[0] : value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (form.password !== form.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        let profileImageUrl = null;

        console.log("Antes de subir al S3. Mira comentario.");

        if (form.profileImage) {
            const imageFormData = new FormData();
            imageFormData.append("file", form.profileImage);

            console.log("Antes de la mierda");

            try {
                const lambdaResponse = await axios.post(
                    "https://ee9dyhimqd.execute-api.us-east-1.amazonaws.com/prod/upload/photo",
                    imageFormData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                profileImageUrl = lambdaResponse.data.url;
            } catch (uploadError) {
                console.error("❌ Error al subir avatar a S3:", uploadError);
                setError("Error al subir imagen de perfil.");
                return;
            }
        }

        const body = {
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
            username: form.username,
            profileImageUrl: profileImageUrl,
        };

        try {
            const response = await axios.post(
                "http://task-cloud-clb-1438915362.us-east-1.elb.amazonaws.com/users/register",
                body,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess(response.data.message);
            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            setError(error.response?.data?.error || "Error al crear cuenta");
        }
    };

    return (
        <main className="container centered">
            <section className="box register-section">
                <h1>Crear cuenta</h1>

                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        name="username"
                        onChange={handleChange}
                        placeholder="Nombre de usuario"
                        required
                        type="text"
                        value={form.username}
                    />
                    <input
                        name="email"
                        onChange={handleChange}
                        placeholder="Correo electrónico"
                        required
                        type="email"
                        value={form.email}
                    />
                    <input
                        name="password"
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                        type="password"
                        value={form.password}
                    />
                    <input
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirmar contraseña"
                        required
                        type="password"
                        value={form.confirmPassword}
                    />
                    <input
                        accept="image/*"
                        name="profileImage"
                        onChange={handleChange}
                        required
                        type="file"
                    />

                    <button type="submit">Registrarse</button>

                    {error && <p className="error">{error}</p>}
                    {success && <p className="success">{success}</p>}
                </form>
            </section>
        </main>
    );
}
