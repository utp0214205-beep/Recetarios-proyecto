const express = require("express");

const router = express.Router();

const RecetaController = require("../controllers/receta.controller");

// Obtener todas las recetas
router.get(
    "/",
    RecetaController.getAll
);

// Obtener recetas de un recetario
router.get(
    "/recetario/:id_recetario",
    RecetaController.listarPorRecetario
);

// Crear receta
router.post(
    "/recetario/:id_recetario",
    RecetaController.crear
);

// Obtener una receta
router.get(
    "/recetario/:id_recetario/:id_receta",
    RecetaController.obtenerDetalle
);

// ACTUALIZAR RECETA
router.put(
    "/recetario/:id_recetario/:id_receta",
    RecetaController.actualizar
);

module.exports = router;