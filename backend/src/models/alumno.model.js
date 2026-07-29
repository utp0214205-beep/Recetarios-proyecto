// src/models/alumno.model.js
const db = require('../config/db');

const AlumnoModel = {
  create: async (alumnoData) => {
    const { matricula, nombre, apellido_paterno, apellido_materno, correo, contrasena } = alumnoData;
    const query = `
      INSERT INTO alumno (matricula, nombre, apellido_paterno, apellido_materno, correo, contrasena) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [matricula, nombre, apellido_paterno, apellido_materno, correo, contrasena]);
    return result.insertId;
  },

  findByCorreo: async (correo) => {
    const query = 'SELECT * FROM alumno WHERE correo = ?';
    const [rows] = await db.execute(query, [correo]);
    return rows[0];
  },

  findByMatricula: async (matricula) => {
    const query = 'SELECT * FROM alumno WHERE matricula = ?';
    const [rows] = await db.execute(query, [matricula]);
    return rows[0];
  },

  findById: async (id_alumno) => {
    // Cambiado para reflejar los nuevos campos en el perfil
    const query = 'SELECT id_alumno, matricula, nombre, apellido_paterno, apellido_materno, correo FROM alumno WHERE id_alumno = ?';
    const [rows] = await db.execute(query, [id_alumno]);
    return rows[0];
  },

  getAll: async () => {
    const query = 'SELECT id_alumno, matricula, nombre, apellido_paterno, apellido_materno, correo FROM alumno ORDER BY id_alumno DESC';
    const [rows] = await db.execute(query);
    return rows;
  }
};

module.exports = AlumnoModel;