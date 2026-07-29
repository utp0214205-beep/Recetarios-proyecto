// src/controllers/alumno.controller.js
const AlumnoModel = require('../models/alumno.model');
const bcrypt = require('bcrypt');

const AlumnoController = {
  registrar: async (req, res) => {
    try {
      const { matricula, nombre, apellido_paterno, apellido_materno, correo, contrasena } = req.body;

      if (!matricula || !nombre || !apellido_paterno || !apellido_materno || !correo || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
      }

      const existeCorreo = await AlumnoModel.findByCorreo(correo);
      if (existeCorreo) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
      }

      const existeMatricula = await AlumnoModel.findByMatricula(matricula);
      if (existeMatricula) {
        return res.status(400).json({ message: 'La matrícula ya está registrada.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);

      const nuevoId = await AlumnoModel.create({
        matricula,
        nombre,
        apellido_paterno,
        apellido_materno,
        correo,
        contrasena: hashedPassword
      });

      return res.status(201).json({
        message: 'Alumno registrado con éxito.',
        id_alumno: nuevoId
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor al registrar alumno.' });
    }
  },

  login: async (req, res) => {
    try {
      const { correo, contrasena } = req.body;

      if (!correo || !contrasena) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos.' });
      }

      const alumno = await AlumnoModel.findByCorreo(correo);
      if (!alumno) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }

      const passwordValido = await bcrypt.compare(contrasena, alumno.contrasena);
      if (!passwordValido) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }

      return res.status(200).json({
        message: 'Autenticación exitosa.',
        alumno: {
          id_alumno: alumno.id_alumno,
          nombre: alumno.nombre,
          apellido_paterno: alumno.apellido_paterno,
          apellido_materno: alumno.apellido_materno,
          correo: alumno.correo
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor al iniciar sesión.' });
    }
  },

  obtenerPerfil: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'Es necesario proporcionar un ID de alumno válido.' });
      }

      const alumno = await AlumnoModel.findById(id);
      if (!alumno) {
        return res.status(404).json({ message: 'Alumno no encontrado.' });
      }
      return res.status(200).json(alumno);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor al obtener perfil.' });
    }
  },

  getAll: async (req, res) => {
    try {
      const alumnos = await AlumnoModel.getAll();
      return res.status(200).json(alumnos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al obtener el listado de alumnos.' });
    }
  }
};

module.exports = AlumnoController;