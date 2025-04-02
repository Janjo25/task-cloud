import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [form, setForm] = useState({username: "", password: ""});

    const handleChange = (event) => setForm({...form, [event.target.name]: event.target.value});

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Clears any previous error message.
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/users/login", form);
            const token = response.data.token;
            localStorage.setItem("authenticationToken", token);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.error || "Error al iniciar sesión");
        }
    };

    return (
        <main className="container centered">
            <section className="login-box">
                <h1>Iniciar sesión</h1>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        name="username"
                        onChange={handleChange}
                        placeholder="Nombre de usuario"
                        required
                        type="text"
                        value={form.username}
                    />
                    <input
                        name="password"
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                        type="password"
                        value={form.password}
                    />

                    <button type="submit">Entrar</button>

                    {error && <p className="error">{error}</p>}
                </form>
            </section>
        </main>
    );
}
