const express = require('express');
const router = express.Router();

const RecetarioController = require('../controllers/recetario.controller');
const RecetaController = require('../controllers/receta.controller');

// ========= RECETARIOS =========

router.post('/', RecetarioController.crear);

router.get('/', RecetarioController.listarMisRecetarios);


// ========= EXPORTAR RECETARIO =========

// GET /api/recetarios/1/pdf
router.get(
    '/:id_recetario/pdf',
    RecetarioController.exportarPDF
);


// Obtener recetario por ID
// GET /api/recetarios/1
router.get(
    '/:id',
    RecetarioController.obtenerPorId
);


router.put(
    '/:id',
    RecetarioController.actualizar
);


router.delete(
    '/:id',
    RecetarioController.eliminar
);


// ========= RECETAS DEL RECETARIO =========

// POST /api/recetarios/1/recetas
router.post(
    '/:id_recetario/recetas',
    RecetaController.crear
);


// GET /api/recetarios/1/recetas
router.get(
    '/:id_recetario/recetas',
    RecetaController.listarPorRecetario
);


// GET /api/recetarios/1/recetas/8
router.get(
    '/:id_recetario/recetas/:id_receta',
    RecetaController.obtenerDetalle
);


module.exports = router;