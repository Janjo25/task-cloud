const {
    createTask: createTaskModel,
    getTasksByUserId,
} = require("../models/tasks.model");


async function createTask(request, response) {
    const {title, description} = request.body;
    const accountId = request.user.id;

    // Validates that the title is not empty.
    if (!title) return response.status(400).json({error: "El título de la tarea es obligatorio."});

    try {
        // Creates the task in the database.
        const task = await createTaskModel(accountId, description, title);
        return response.status(201).json({
            message: "Tarea creada exitosamente.",
            task,
        });
    } catch (error) {
        console.error("ERROR - Failed to create task:", error);
        return response.status(500).json({error: "Error interno al crear tarea."});
    }
}

async function getTasks(request, response) {
    const accountId = request.user.id;

    try {
        // Retrieves the tasks from the database.
        const tasks = await getTasksByUserId(accountId);
        return response.status(200).json({
            message: "Tareas obtenidas exitosamente.",
            tasks,
        });
    } catch (error) {
        console.error("ERROR - Failed to get tasks:", error);
        return response.status(500).json({error: "Error interno al obtener tareas."});
    }
}

module.exports = {
    createTask,
    getTasks,
};
