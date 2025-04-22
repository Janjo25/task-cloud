import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

import "./shared/BaseModal.css";
import "./FileModal.css";

export default function FileModal({file, onClose}) {
    if (!file) return null;

    const [textContent, setTextContent] = useState("");
    const {fileName, fileType, fileUrl} = file;

    useEffect(() => {
        if (!fileType.startsWith("text/")) return;

        (async () => {
            try {
                const response = await fetch(fileUrl);
                const text = await response.text();
                setTextContent(text);
            } catch (error) {
                alert(error.message);
            }
        })();
    }, [fileType, fileUrl]);

    const renderFile = (fileType, fileName, fileUrl, textContent) => {
        return (
            fileType.startsWith("image/") ? (
                <img alt={fileName} className="modal-image" src={fileUrl}/>
            ) : (
                <pre className="modal-text">{textContent || "Cargando..."}</pre>
            )
        );
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                <header className="modal-header">
                    <div className="modal-header-content">
                        <h2 className="modal-title">{fileName}</h2>
                        <button aria-label="Cerrar" className="close-button" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark}/>
                        </button>
                    </div>
                </header>

                {renderFile(fileType, fileName, fileUrl, textContent)}
            </div>
        </div>
    );
}
