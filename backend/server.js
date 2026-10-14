require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const recursoRoutes = require("./routes/recursoRoutes");
const verificarToken = require("./middleware/auth.middleware");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/productos", verificarToken, productRoutes);
app.use("/api/recursos", verificarToken, recursoRoutes);

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Tarea 4 funcionando",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
