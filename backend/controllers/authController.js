const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const crearToken = (usuario) =>
  jwt.sign(
    {
      id: usuario._id,
      rol: usuario.rol,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5m" }
  );

const register = async (req, res) => {
  try {
    const { nombreCompleto, correo, password } = req.body ?? {};

    if (
      typeof nombreCompleto !== "string" ||
      !nombreCompleto.trim() ||
      typeof correo !== "string" ||
      !correo.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Nombre, correo y contraseña son obligatorios",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET no está configurado");
      return res.status(500).json({
        mensaje: "Error de configuración de autenticación",
      });
    }

    const correoNormalizado = correo.trim().toLowerCase();
    const usuarioExistente = await User.findOne({ correo: correoNormalizado });

    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado",
      });
    }

    const usuario = await User.create({
      nombreCompleto,
      correo: correoNormalizado,
      password,
      rol: "cliente",
    });

    const token = crearToken(usuario);

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      token,
      usuario: {
        id: usuario._id,
        nombreCompleto: usuario.nombreCompleto,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado",
      });
    }

    console.error("Error al registrar usuario:", error.message);
    return res.status(500).json({
      mensaje: "Error al registrar usuario",
    });
  }
};

const login = async (req, res) => {
  try {
    const { correo, password } = req.body ?? {};

    if (
      typeof correo !== "string" ||
      !correo.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET no está configurado");
      return res.status(500).json({
        mensaje: "Error de configuración de autenticación",
      });
    }

    const usuario = await User.findOne({
      correo: correo.trim().toLowerCase(),
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas",
      });
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Credenciales inválidas",
      });
    }

    const token = crearToken(usuario);

    return res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombreCompleto: usuario.nombreCompleto,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error.message);
    return res.status(500).json({
      mensaje: "Error en el login",
    });
  }
};

module.exports = {
  register,
  login,
};
