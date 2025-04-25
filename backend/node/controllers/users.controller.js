const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    createUser: createUserModel,
    findUserByUsername,
} = require("../models/users.model");

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
    const {email, password, confirmPassword, username, profileImageUrl} = request.body;
    const requiredFields = [email, password, confirmPassword, username];

    console.log("BODY:", request.body);

    if (requiredFields.some(field => !field)) {
        return response.status(400).json({error: "Todos los campos son obligatorios."});
    }

    const existingUser = await findUserByUsername(username);
    if (existingUser) return response.status(409).json({error: "El nombre de usuario ya está en uso."});

    if (password !== confirmPassword) {
        return response.status(400).json({error: "Las contraseñas no coinciden."});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await createUserModel(email, hashedPassword, profileImageUrl || null, username);

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
