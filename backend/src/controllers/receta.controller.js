// src/controllers/receta.controller.js
const RecetaService = require('../services/receta.service');
const RecetaModel = require('../models/receta.model');

const RecetaController = {
  crear: async (req, res) => {
    try {
      const { id_recetario } = req.params;
      const datosReceta = req.body;

      if (!datosReceta.nombre_platillo) {
        return res.status(400).json({ message: 'El nombre del platillo es obligatorio.' });
      }

      const nuevaRecetaId = await RecetaService.crearRecetaCompleta(id_recetario, datosReceta);

      return res.status(201).json({
        message: '¡Receta creada con éxito!',
        id_receta: nuevaRecetaId
      });
    } catch (error) {
      console.error('Error en transacción de receta:', error);
      return res.status(500).json({ message: 'Error interno en el servidor al procesar la receta.' });
    }
  },

  listarPorRecetario: async (req, res) => {
    try {
      const { id_recetario } = req.params;
      const recetas = await RecetaModel.listarPorRecetario(id_recetario);
      return res.status(200).json(recetas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al listar las recetas.' });
    }
  },

  obtenerDetalle: async (req, res) => {
    try {
      const { id_recetario, id_receta } = req.params;
      const recetaCompleta = await RecetaModel.obtenerDetalleCompleto(id_receta);
      
      if (!recetaCompleta || recetaCompleta.id_recetario !== parseInt(id_recetario)) {
        return res.status(404).json({ message: 'La receta no existe en este recetario.' });
      }

      return res.status(200).json(recetaCompleta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener el detalle de la receta.' });
    }
  },
  // Agregar dentro de RecetaController en src/controllers/receta.controller.js
  getAll: async (req, res) => {
    try {
      const recetas = await RecetaModel.getAllGlobal();
      return res.status(200).json(recetas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener todas las recetas del sistema.' });
    }
  }
};

module.exports = RecetaController;