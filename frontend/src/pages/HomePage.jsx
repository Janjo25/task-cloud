import {useNavigate} from "react-router-dom";

import "./HomePage.css";

export default function HomePage() {
    const navigate = useNavigate();

    const goToFiles = () => navigate("/files");
    const goToTasks = () => navigate("/tasks");

    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username ?? "";

    const handleLogout = () => {
        localStorage.removeItem("authenticationToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <main className="container centered">
            <img
                alt={`Avatar de ${username || "usuario"}`}
                className="user-avatar"
                src={user?.profileImageUrl || "/default-avatar.png"}
            />
            <h1>¡Hola{username ? `, ${username}` : ""}!</h1>

            <section className="home-box">
                <h2>¿Qué deseas gestionar hoy?</h2>

                <div className="home-options">
                    <button onClick={goToTasks}>📝 Tareas</button>
                    <button onClick={goToFiles}>📂 Archivos</button>
                </div>

                <div className="logout-option">
                    <button className="logout-button" onClick={handleLogout}>
                        🔓 Cerrar sesión
                    </button>
                </div>
            </section>
        </main>
    );
}
