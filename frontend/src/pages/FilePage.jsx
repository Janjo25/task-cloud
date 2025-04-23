import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

import FileCard from "../components/FileCard.jsx";
import FileModal from "../components/FileModal.jsx";
import FloatingActionButton from "../components/FloatingActionButton.jsx";
import {getFiles, uploadFile} from "../services/files.js";

import "./FilePage.css";

export default function FilePage() {
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const fileInputRef = useRef(null);

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

    const handleUploadClick = () => fileInputRef.current?.click();

    /*──────────────────────────────── Files Handlers ────────────────────────────────*/

    const handleUploadFile = async (event) => {
        const file = event.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const {file: uploadedFile, message} = await uploadFile(formData);
            setFiles((previous) => [uploadedFile, ...previous]);
            alert(message);
        } catch (error) {
            alert(error.message);
        } finally {
            event.target.value = ""; // Clear the input value to allow re-uploading the same file.
        }
    };

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

            <input
                className="files-input"
                multiple={false}
                onChange={handleUploadFile}
                ref={fileInputRef}
                type="file"
            />

            <FloatingActionButton label="Subir archivo" onClick={handleUploadClick}>
                <FontAwesomeIcon icon={faPlus}/>
            </FloatingActionButton>

            {selectedFile && (
                <FileModal file={selectedFile} onClose={handleCloseModal}/>
            )}
        </>
    );
}
