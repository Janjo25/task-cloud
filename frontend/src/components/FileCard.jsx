import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faFileAlt, faFileImage} from "@fortawesome/free-solid-svg-icons";

import "./FileCard.css";

export default function FileCard({file}) {
    const {fileName, fileType, fileUrl} = file;
    const isImage = fileType.startsWith("image/");
    let icon = faFile;

    if (fileType.startsWith("image/")) {
        icon = faFileImage;
    } else if (fileType.startsWith("text/")) {
        icon = faFileAlt;
    }

    return (
        <div className="file-card">
            <div className="file-card-preview">
                {isImage ? (
                    <img alt={fileName} src={fileUrl}/>
                ) : (
                    <FontAwesomeIcon className="file-card-icon" icon={icon}/>
                )}
            </div>
            <p className="file-card-name">{fileName}</p>
        </div>
    );
}
