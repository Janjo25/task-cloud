import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import FloatingActionButton from "../components/FloatingActionButton.jsx";
import TaskCard from "../components/TaskCard.jsx";
import TaskModal from "../components/TaskModal.jsx";
import {createTask, getTasks} from "../services/tasks.js";

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

            {/* The way the modal is rendered depends on the modal mode.
              * If the modal is in create mode, a new task can be created by filling in the form.
              * If the modal is in view mode, the selected task is rendered in the modal.
              */}
            {modalMode === "create" && (
                <TaskModal mode="create" onClose={handleCloseModal} onSave={handleCreateTask}/>
            )}

            {modalMode === "view" && selectedTask && (
                <TaskModal mode="view" onClose={handleCloseModal} task={selectedTask}/>
            )}
        </>
    );
}
