// src/routes/alumno.routes.js
const express = require('express');
const router = express.Router();
const AlumnoController = require('../controllers/alumno.controller');

// Rutas base
router.get('/', AlumnoController.getAll);
router.post('/registro', AlumnoController.registrar);
router.post('/login', AlumnoController.login);

// Ruta de Perfil Dinámica (¡Asegúrate de que tenga el /:id!)
router.get('/perfil/:id', AlumnoController.obtenerPerfil); 

module.exports = router;