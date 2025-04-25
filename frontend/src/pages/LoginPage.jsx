import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

import "./LoginPage.css";

export default function LoginPage() {
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [form, setForm] = useState({username: "", password: ""});
    const [success, setSuccess] = useState(null);

    const handleChange = (event) => setForm({...form, [event.target.name]: event.target.value});

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Clears any previous error message.
        setError(null);

        try {
            const response = await axios.post("http://task-cloud-clb-1438915362.us-east-1.elb.amazonaws.com/users/login", form);
            const {message, token, user} = response.data;

            localStorage.setItem("authenticationToken", token);
            localStorage.setItem("user", JSON.stringify(user));

            setSuccess(message);

            setTimeout(() => navigate("/"), 1000);
        } catch (error) {
            setError(error.response?.data?.error || "Error al iniciar sesión");
        }
    };

    return (
        <main className="container centered">
            <section className="box login-section">
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
                    {success && <p className="success">{success}</p>}

                    <p className="form-footer">
                        ¿No tenés cuenta?{" "}
                        <Link to="/register">
                            Registrate aquí</Link>
                    </p>
                </form>
            </section>
        </main>
    );
}
