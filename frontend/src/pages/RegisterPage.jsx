import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import "./RegisterPage.css";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
        username: "",
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

        // Clears any previous error message.
        setError(null);

        if (form.password !== form.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const formData = new FormData();
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("confirmPassword", form.confirmPassword);
        formData.append("profileImage", form.profileImage);
        formData.append("username", form.username);

        try {
            const response = await axios.post("http://18.233.0.18:3000/users/register", formData);

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
