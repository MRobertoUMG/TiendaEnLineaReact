const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "unauthorized",
      message: "Se requiere un token de autenticación.",
    });
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return res.status(401).json({
      error: "unauthorized",
      message: "El token no fue proporcionado.",
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET no está configurado");
    return res.status(500).json({
      error: "server_configuration_error",
      message: "Error de configuración de autenticación.",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "token_expired",
        message:
          "La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente.",
      });
    }

    return res.status(401).json({
      error: "invalid_token",
      message: "El token es inválido o no puede verificarse.",
    });
  }

  return next();
}

module.exports = verificarToken;
