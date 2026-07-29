// src/app.js (Evolución final con todas las rutas mapeadas)
const cors = require("cors");
const express = require('express');
const dotenv = require('dotenv');
const alumnoRoutes = require('./routes/alumno.routes');
const recetarioRoutes = require('./routes/recetario.routes');
const recetaRoutes = require('./routes/receta.routes'); // <-- NUEVO

dotenv.config();

const app = express();

const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('./swagger.json');

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

// Aumentamos el límite para soportar arreglos de fotografías en formato Base64 sin problemas
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Dentro de src/app.js
app.use('/api/alumnos', alumnoRoutes);

// Recetarios
app.use('/api/recetarios', recetarioRoutes);

// Recetas globales
app.use('/api/recetas', recetaRoutes);
// Control 404 global
app.use((req, res, next) => {
  res.status(404).json({ message: 'Recurso no encontrado en el servidor API.' });
});

module.exports = app;