import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

import "./shared/BaseModal.css";
import "./TaskModal.css";

export default function TaskModal({mode, onClose, onDelete, onSave, onToggleCompletion, onUpdate, task}) {
    if (mode === "view" && !task) return null;

    const [description, setDescription] = useState(task?.description || "");
    const [title, setTitle] = useState(task?.title || "");

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
                rows="15"
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
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>
                </header>

                {renderDescription(mode, description, setDescription)}

                {(mode === "create" || mode === "update") && (
                    <footer className="modal-actions">
                        <button onClick={handleSave}>
                            {mode === "create" ? "Guardar" : "Guardar cambios"}
                        </button>
                        <button onClick={onClose}>Cancelar</button>
                    </footer>
                )}

                {mode === "view" && (
                    <footer className="modal-actions">
                        <button className="update-button" onClick={onUpdate}>Editar</button>
                        <button className="toggle-button" onClick={onToggleCompletion}>
                            {
                                task.completed
                                    ? <FontAwesomeIcon icon={faCircleXmark}/>
                                    : <FontAwesomeIcon icon={faCircleCheck}/>
                            }
                        </button>
                        <button className="delete-button" onClick={onDelete}>Eliminar</button>
                    </footer>
                )}
            </div>
        </div>
    );
}
