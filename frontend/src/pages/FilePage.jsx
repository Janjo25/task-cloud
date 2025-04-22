import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import FileCard from "../components/FileCard.jsx";
import FileModal from "../components/FileModal.jsx";
import {getFiles} from "../services/files.js";

import "./FilePage.css";

export default function FilePage() {
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const files = await getFiles();
                setFiles(files || []);
            } catch (error) {
                navigate("/error", {
                    state: {message: error.message},
                });
            }
        })();
    }, []);

    /*──────────────────────────────── Click Handlers ────────────────────────────────*/
    const handleCardClick = (file) => setSelectedFile(file);

    const handleCloseModal = () => setSelectedFile(null);

    return (
        <>
            <main className="container">
                <section className="files-section">
                    <h1>Mis Archivos</h1>

                    {files.length === 0 ? (
                        <div className="empty-state">
                            <FontAwesomeIcon className="empty-icon" icon={faFolderOpen}/>
                            <p className="empty-text">Tus archivos aparecerán aquí</p>
                        </div>
                    ) : (
                        <div className="files-layout">
                            {files.map(file => <FileCard key={file.taskId} file={file} onClick={handleCardClick}/>)}
                        </div>
                    )}
                </section>
            </main>

            {selectedFile && (
                <FileModal file={selectedFile} onClose={handleCloseModal}/>
            )}
        </>
    );
}
