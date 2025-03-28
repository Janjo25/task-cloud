const {
    createTask: createTaskModel,
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

module.exports = {
    createTask,
};
