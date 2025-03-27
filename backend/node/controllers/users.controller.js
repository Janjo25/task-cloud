const bcrypt = require("bcrypt");
/** @type {import("pg").Pool} */
const db = require("../config/db");
const {findUserByUsername} = require("../models/users.model");

async function registerUser(request, response) {
    const {email, password, confirmPassword, profileImageURL, username} = request.body;
    const requiredFields = [email, password, confirmPassword, username];

    // Validates the required fields.
    if (requiredFields.some(field => !field)) {
        return response.status(400).json({error: "Todos los campos son obligatorios."});
    }

    // Checks if a user with the same username already exists.
    const existingUser = await findUserByUsername(username);
    if (existingUser) return response.status(409).json({error: "El nombre de usuario ya está en uso."});

    // Checks if both passwords match.
    if (password !== confirmPassword) return response.status(400).json({error: "Las contraseñas no coinciden."});

    try {
        // Hashes the password before storing it in the database.
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserts the new user into the database.
        await db.query(
            `INSERT INTO account (email, password, profile_image_url, username)
             VALUES ($1, $2, $3, $4)`,
            [email, hashedPassword, profileImageURL || null, username]
        );

        return response.status(201).json({message: "Usuario registrado exitosamente."});
    } catch (error) {
        console.error("ERROR - Failed to register user:", error);
        return response.status(500).json({error: "Error interno del servidor."});
    }
}

module.exports = {
    registerUser,
};
