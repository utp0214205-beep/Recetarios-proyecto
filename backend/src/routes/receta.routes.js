// src/routes/receta.routes.js
/*
const express = require('express');
const router = express.Router(); 
const RecetaController = require('../controllers/receta.controller');

// Esta ruta "/" combinada con el app.use('/api/recetas', ...) en app.js
// se convierte en: GET /api/recetas
router.get('/', RecetaController.getAll); 

// Las demás rutas del módulo (si las tienes)
router.post('/recetario/:id_recetario', RecetaController.crear);
router.get('/recetario/:id_recetario', RecetaController.listarPorRecetario);
router.get('/recetario/:id_recetario/detalle/:id_receta', RecetaController.obtenerDetalle);

module.exports = router;
*/
const express = require('express');

const router = express.Router();

const RecetaController = require('../controllers/receta.controller');

// GET /api/recetas
router.get('/', RecetaController.getAll);

module.exports = router;