import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import FileCard from "../components/FileCard.jsx";
import {getFiles} from "../services/files.js";

import "./FilePage.css";

export default function FilesPages() {
    const navigate = useNavigate();

    const [files, setFiles] = useState([]);

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

    return (
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
                        {files.map(file => <FileCard key={file.fileId} file={file}/>)}
                    </div>
                )}
            </section>
        </main>
    );
}
