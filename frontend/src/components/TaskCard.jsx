import "./TaskCard.css";

export default function TaskCard({task, onClick}) {
    const {completed, description, title} = task;

    return (
        <div className={`task-card${completed ? " completed" : ""}`} onClick={() => onClick(task)}>
            <h3 className="task-title">{title}</h3>
            <p className="task-description">{description}</p>
        </div>
    );
}
