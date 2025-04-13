import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

import "./TaskModal.css";

export default function TaskModal({task, onClose}) {
    if (!task) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                <header className="modal-header">
                    <div className="modal-header-content">
                        <h2 className="modal-title">{task.title}</h2>
                        <button aria-label="Cerrar" className="close-button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark} size="lg"/>
                        </button>
                    </div>
                </header>

                <p>{task.description}</p>

                {/* TODO: Add buttons for edit, delete, and complete */}
            </div>
        </div>
    );
}
