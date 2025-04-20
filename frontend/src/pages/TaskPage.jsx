import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import FloatingActionButton from "../components/FloatingActionButton.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskModal from "../components/TaskModal.jsx";
import {createTask, getTasks, updateTask} from "../services/tasks.js";

import "./TaskPage.css";

export default function TasksPage() {
    const navigate = useNavigate();

    const [modalMode, setModalMode] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const tasks = await getTasks();
                setTasks(tasks || []);
            } catch (error) {
                navigate("/error", {
                    state: {message: error.message},
                });
            }
        })();
    }, []);

    const handleCardClick = (task) => {
        setModalMode("view");
        setSelectedTask(task);
    };

    // TODO: Add close animation to modal.
    const handleCloseModal = () => {
        setModalMode(null);
        setSelectedTask(null);
    };

    const handleCreateClick = () => {
        setModalMode("create");
        setSelectedTask(null);
    };

    const handleUpdateClick = () => {
        setModalMode("update");
    };

    const handleCreateTask = async ({title, description}) => {
        if (!title.trim()) {
            alert("El título de la tarea es obligatorio.");
            return;
        }

        try {
            const {message, task} = await createTask({title, description});
            setTasks((previous) => [task, ...previous]);
            alert(message);
            handleCloseModal();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdateTask = async ({title, description}) => {
        const titleChanged = title.trim() !== selectedTask.title.trim();
        const descriptionChanged = (description || "").trim() !== (selectedTask.description || "").trim();
        const hasChanges = titleChanged || descriptionChanged;

        if (!hasChanges) {
            alert("Se requiere al menos un campo para actualizar.");
            return;
        }

        try {
            const {message, updated} = await updateTask(selectedTask.taskId, {title, description});

            setTasks((previous) => {
                return previous.map((task) => task.taskId === selectedTask.taskId ? updated : task);
            });

            alert(message);
            handleCloseModal();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <main className="container">
                <section className="tasks-section">
                    <h1>Mis Tareas</h1>

                    <div className="tasks-layout">
                        {tasks.length === 0 ? (
                            <div className="empty-state">
                                <FontAwesomeIcon className="empty-icon" icon={faBell}/>
                                <p className="empty-text">Las tareas que crees aparecerán aquí</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <TaskCard key={task.taskId} onClick={handleCardClick} task={task}/>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <FloatingActionButton label="Crear tarea" onClick={handleCreateClick}>
                <FontAwesomeIcon icon={faPlus}/>
            </FloatingActionButton>

            {/* The way the modal is rendered depends on the modal mode:
              * - In "create" mode, a blank modal is shown to create a new task.
              * - In "update" mode, the modal is re-rendered with editable fields using the same task data.
              * - In "view" mode, the selected task is displayed with its details.
              *
              * Switching between modes (e.g. from "view" to "update") triggers a new render of the modal.
              */}
            {modalMode === "create" && (
                <TaskModal mode="create" onClose={handleCloseModal} onSave={handleCreateTask}/>
            )}

            {modalMode === "update" && selectedTask && (
                <TaskModal mode="update" onClose={handleCloseModal} onSave={handleUpdateTask} task={selectedTask}/>
            )}

            {modalMode === "view" && selectedTask && (
                <TaskModal mode="view" onClose={handleCloseModal} onUpdate={handleUpdateClick} task={selectedTask}/>
            )}
        </>
    );
}
