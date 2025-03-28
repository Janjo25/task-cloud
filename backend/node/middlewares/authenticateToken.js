const jwt = require("jsonwebtoken");

function authenticateToken(request, response, next) {
    const authHeader = request.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    // Validates if the token is present.
    if (!token) return response.status(401).json({message: "Acceso denegado. No se proporcionó ningún token."});

    // Verifies the token using the secret key.
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return response.status(403).json({message: "Token inválido. Acceso no autorizado."});

        request.user = user;
        next();
    });
}

module.exports = authenticateToken;
