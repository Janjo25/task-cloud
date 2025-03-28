const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/** @type {import("pg").Pool} */
const db = require("../config/db");
const {findUserByUsername} = require("../models/users.model");

/**
 * @typedef {Object} User
 * @property {number} accountId
 * @property {string} email
 * @property {string} password
 * @property {string} profileImageUrl
 * @property {string} username
 */
function generateJWT(user, response) {
    const payload = {id: user.accountId, username: user.username};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});

    return response.status(200).json({
        message: "Inicio de sesión exitoso.",
        token,
        user: {
            email: user.email,
            id: user.accountId,
            profileImageUrl: user.profileImageUrl,
            username: user.username,
        }
    });
}

async function loginUser(request, response) {
    const {username, password} = request.body;
    const requiredFields = [username, password];

    if (requiredFields.some(field => !field)) {
        return response.status(400).json({error: "Nombre de usuario y contraseña son obligatorios."});
    }

    try {
        const user = await findUserByUsername(username);
        if (!user) return response.status(401).json({error: "Credenciales inválidas."});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return response.status(401).json({error: "Credenciales inválidas."});

        return generateJWT(user, response);
    } catch (error) {
        console.error("ERROR - Login failed:", error);
        return response.status(500).json({error: "Error interno al iniciar sesión."});
    }
}

async function registerUser(request, response) {
    const {email, password, confirmPassword, profileImageUrl, username} = request.body;
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
            [email, hashedPassword, profileImageUrl || null, username]
        );

        return response.status(201).json({message: "Usuario registrado exitosamente."});
    } catch (error) {
        console.error("ERROR - Failed to register user:", error);
        return response.status(500).json({error: "Error interno del servidor."});
    }
}

module.exports = {
    loginUser,
    registerUser,
};
