// src/controllers/recetario.controller.js
const RecetarioModel = require('../models/recetario.model');

const RecetarioController = {
  crear: async (req, res) => {
    try {
      const { id_alumno, nombre } = req.body; // descripcion removida del body

      if (!id_alumno || !nombre) {
        return res.status(400).json({ message: 'El id_alumno y el nombre son obligatorios.' });
      }

      const fecha_creacion = new Date().toISOString().split('T')[0];

      const nuevoId = await RecetarioModel.create({
        id_alumno,
        nombre,
        fecha_creacion
      });

      return res.status(201).json({
        message: 'Recetario creado con éxito.',
        recetario: { id_recetario: nuevoId, id_alumno, nombre, fecha_creacion }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno al crear el recetario.' });
    }
  },

  listarMisRecetarios: async (req, res) => {
    try {
      const { id_alumno } = req.query;

      if (id_alumno) {
        const recetarios = await RecetarioModel.findAllByAlumno(id_alumno);
        return res.status(200).json(recetarios);
      }

      const todosLosRecetarios = await RecetarioModel.getAllGlobal();
      return res.status(200).json(todosLosRecetarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno al obtener los recetarios.' });
    }
  },

  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT id_recetario, id_alumno, nombre, fecha_creacion FROM recetario WHERE id_recetario = ?';
      const [rows] = await require('../config/db').execute(query, [id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Recetario no encontrado.' });
      }

      return res.status(200).json(rows[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno al obtener el recetario.' });
    }
  },

  actualizar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body; // descripcion removida

      if (!nombre) {
        return res.status(400).json({ message: 'El nombre del recetario es obligatorio.' });
      }

      const actualizado = await RecetarioModel.update(id, { nombre });
      if (!actualizado) {
        return res.status(404).json({ message: 'Recetario no encontrado para modificar.' });
      }

      return res.status(200).json({ message: 'Recetario actualizado con éxito.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno al actualizar el recetario.' });
    }
  },

  eliminar: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await RecetarioModel.delete(id);
      if (!eliminado) {
        return res.status(404).json({ message: 'Recetario no encontrado para eliminar.' });
      }
      return res.status(200).json({ message: 'Recetario eliminado con éxito.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno al eliminar el recetario.' });
    }
  }
};

module.exports = RecetarioController;