const mongoose = require("mongoose");
const Product = require("../models/Product");

const camposProducto = [
  "nombre",
  "descripcion",
  "precio",
  "imagen",
  "especificaciones",
];

const escaparRegex = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const obtenerDatosProducto = (datos) =>
  Object.fromEntries(
    camposProducto
      .filter((campo) => Object.hasOwn(datos, campo))
      .map((campo) => [campo, datos[campo]])
  );

const validarId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ mensaje: "ID de producto inválido" });
    return false;
  }

  return true;
};

const responderError = (res, error, mensaje) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({
      mensaje,
      error: error.message,
    });
  }

  console.error(`${mensaje}:`, error.message);
  return res.status(500).json({ mensaje });
};

const obtenerProductos = async (req, res) => {
  try {
    const { buscar } = req.query;

    if (buscar !== undefined && typeof buscar !== "string") {
      return res.status(400).json({
        mensaje: "El parámetro buscar debe ser texto",
      });
    }

    const filtro = buscar
      ? { nombre: { $regex: escaparRegex(buscar), $options: "i" } }
      : {};

    const productos = await Product.find(filtro);
    return res.json(productos);
  } catch (error) {
    return responderError(res, error, "Error al obtener productos");
  }
};

const obtenerProducto = async (req, res) => {
  if (!validarId(req.params.id, res)) {
    return;
  }

  try {
    const producto = await Product.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    return res.json(producto);
  } catch (error) {
    return responderError(res, error, "Error al obtener producto");
  }
};

const crearProducto = async (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ mensaje: "Datos de producto inválidos" });
  }

  try {
    const producto = await Product.create(obtenerDatosProducto(req.body));
    return res.status(201).json(producto);
  } catch (error) {
    return responderError(res, error, "Error al crear producto");
  }
};

const actualizarProducto = async (req, res) => {
  if (!validarId(req.params.id, res)) {
    return;
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ mensaje: "Datos de producto inválidos" });
  }

  const cambios = obtenerDatosProducto(req.body);
  if (Object.keys(cambios).length === 0) {
    return res.status(400).json({
      mensaje: "Debe proporcionar al menos un campo válido para actualizar",
    });
  }

  try {
    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: cambios },
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    return res.json(producto);
  } catch (error) {
    return responderError(res, error, "Error al actualizar producto");
  }
};

const eliminarProducto = async (req, res) => {
  if (!validarId(req.params.id, res)) {
    return;
  }

  try {
    const producto = await Product.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    return res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    return responderError(res, error, "Error al eliminar producto");
  }
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
