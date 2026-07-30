const express = require("express");

const router = express.Router();

const RecetaController = require("../controllers/receta.controller");

// Obtener todas las recetas (administración)
router.get("/", RecetaController.getAll);

// Obtener las recetas de un recetario
router.get(
    "/recetario/:id_recetario",
    RecetaController.listarPorRecetario
);

// Crear una receta
router.post(
    "/recetario/:id_recetario",
    RecetaController.crear
);

// Obtener una receta específica
router.get(
    "/recetario/:id_recetario/:id_receta",
    RecetaController.obtenerDetalle
);

module.exports = router;