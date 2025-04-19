import {useLocation, useNavigate} from "react-router-dom";

import "./ErrorPage.css";

export default function ErrorPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const message = location.state?.message || "Ha ocurrido un error inesperado";

    return (
        <main className="container centered ">
            <section className="box error-section">
                <img
                    alt="Imagen de error"
                    className="error-image"
                    src="/error-bear.png"
                />

                <h1>Oops...</h1>
                <p>{message}</p>

                <button onClick={() => navigate("/")}>
                    Volver al inicio
                </button>
            </section>
        </main>
    );
}
