const {
    createTask: createTaskModel,
    getTasksByUserId,
    toggleCompletion: toggleCompletionModel,
    updateTask: updateTaskModel,
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

// ToggleCompletion toggles the completion status of a task.
async function toggleCompletion(request, response) {
    const accountId = request.user.id;
    const taskId = parseInt(request.params.id, 10);

    // Validates that the task ID is a number.
    if (isNaN(taskId)) return response.status(400).json({error: "ID de tarea inválido."});

    try {
        // Toggles the completion status of the task in the database.
        const updated = await toggleCompletionModel(taskId, accountId);

        // Checks if the task was toggled.
        if (!updated) return response.status(404).json({error: "Tarea no encontrada."});

        return response.status(200).json({
            message: "Estado de tarea actualizado exitosamente.",
            updated,
        });
    } catch (error) {
        console.error("ERROR - Failed to toggle task completion:", error);
        return response.status(500).json({error: "Error interno al actualizar estado de tarea."});
    }
}

// updateTask updates the title and description of a task.
async function updateTask(request, response) {
    const {title, description} = request.body;
    const accountId = request.user.id;
    const taskId = parseInt(request.params.id, 10);
    const requiredFields = [title, description];

    // Validates that at least one field is provided.
    if (!requiredFields.some(field => field)) {
        return response.status(400).json({error: "Se requiere al menos un campo para actualizar."});
    }

    try {
        // Updates the task title and description in the database.
        const updated = await updateTaskModel(taskId, description, title, accountId);

        // Checks if the task was updated.
        if (!updated) return response.status(404).json({error: "Tarea no encontrada."});

        return response.status(200).json({
            message: "Tarea actualizada exitosamente.",
            updated,
        });
    } catch (error) {
        console.error("ERROR - Failed to update task:", error);
        return response.status(500).json({error: "Error interno al actualizar tarea."});
    }
}

module.exports = {
    createTask,
    getTasks,
    toggleCompletion,
    updateTask,
};
