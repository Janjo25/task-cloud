import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

import "./TaskModal.css";

export default function TaskModal({mode, onClose, onSave, task}) {
    if (mode === "view" && !task) return null;

    const [description, setDescription] = useState(mode === "view" ? task.description : "");
    const [title, setTitle] = useState(mode === "view" ? task.title : "");

    const handleSave = () => {
        onSave({title, description});
    };

    const renderDescription = (mode, description, setDescription) => {
        if (mode === "view") return <p>{description}</p>;

        return (
            <textarea
                className="modal-description-input"
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descripción de la tarea"
                rows="5"
                value={description}
            />
        );
    };

    const renderTitle = (mode, title, setTitle) => {
        if (mode === "view") return <h2 className="modal-title">{title}</h2>;

        return (
            <input
                className="modal-title-input"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Título de la tarea"
                type="text"
                value={title}
            />
        );
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                <header className="modal-header">
                    <div className="modal-header-content">
                        {renderTitle(mode, title, setTitle)}
                        <button aria-label="Cerrar" className="close-button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark} size="lg"/>
                        </button>
                    </div>
                </header>

                {renderDescription(mode, description, setDescription)}

                {mode === "create" && (
                    <footer className="modal-actions">
                        <button onClick={handleSave}>Guardar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </footer>
                )}
            </div>
        </div>
    );
}
