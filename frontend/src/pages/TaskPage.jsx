import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import TaskCard from "../components/TaskCard.jsx";
import TaskModal from "../components/TaskModal.jsx";
import {getTasks} from "../services/tasks.js";

import "./TaskPage.css";

export default function TasksPage() {
    const navigate = useNavigate();

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
        setSelectedTask(task);
    };

    // TODO: Add close animation to modal.
    const handleCloseModal = () => {
        setSelectedTask(null);
    };

    return (
        <>
            <main className="container">
                <section className="tasks-section">
                    <h1>Mis Tareas</h1>

                    <div className="tasks-layout">
                        {tasks.length === 0 ? (
                            <div className="empty-state"><FontAwesomeIcon icon={faBell} className="empty-icon"/>
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

            {/* Renders the modal if a task is selected */}
            {selectedTask && (
                <TaskModal onClose={handleCloseModal} task={selectedTask}/>
            )}
        </>
    );
}
