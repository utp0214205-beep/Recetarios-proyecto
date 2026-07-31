// src/models/recetario.model.js
const db = require('../config/db');

const RecetarioModel = {
  create: async (recetarioData) => {
    // Cambiado: Se remueve descripcion
    const { id_alumno, nombre, fecha_creacion } = recetarioData;
    const query = 'INSERT INTO recetario (id_alumno, nombre, fecha_creacion) VALUES (?, ?, ?)';
    const [result] = await db.execute(query, [id_alumno, nombre, fecha_creacion]);
    return result.insertId;
  },

  findAllByAlumno: async (id_alumno) => {
    const query = 'SELECT id_recetario, id_alumno, nombre, fecha_creacion FROM recetario WHERE id_alumno = ? ORDER BY fecha_creacion DESC';
    const [rows] = await db.execute(query, [id_alumno]);
    return rows;
  },

  getAllGlobal: async () => {
    // Adaptado con los nuevos campos de apellido de la tabla alumno
    const query = `
      SELECT r.id_recetario, r.id_alumno, r.nombre, r.fecha_creacion,
             a.nombre AS alumno_nombre, a.apellido_paterno AS alumno_paterno
      FROM recetario r
      INNER JOIN alumno a ON r.id_alumno = a.id_alumno
      ORDER BY r.id_recetario DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
  },

  update: async (id_recetario, recetarioData) => {
    // Cambiado: Solo se puede actualizar el nombre del recetario
    const { nombre } = recetarioData;
    const query = 'UPDATE recetario SET nombre = ? WHERE id_recetario = ?';
    const [result] = await db.execute(query, [nombre, id_recetario]);
    return result.affectedRows > 0;
  },

    delete: async (id_recetario) => {

    const query =
      'DELETE FROM recetario WHERE id_recetario = ?';


    const [result] =
      await db.execute(
        query,
        [id_recetario]
      );


    return result.affectedRows > 0;

  },


  obtenerDetalleRecetario: async (id_recetario) => {

    const [recetario] =
      await db.execute(
        `
        SELECT
            r.id_recetario,
            r.nombre,
            r.fecha_creacion,
            a.nombre AS alumno_nombre,
            a.apellido_paterno,
            a.apellido_materno
        FROM recetario r
        INNER JOIN alumno a
            ON r.id_alumno = a.id_alumno
        WHERE r.id_recetario = ?
        `,
        [id_recetario]
      );


    if (recetario.length === 0) {

      return null;

    }


    const [recetas] =
      await db.execute(
        `
        SELECT
            id_receta,
            nombre_platillo,
            asignatura,
            clasificacion
        FROM receta
        WHERE id_recetario = ?
        ORDER BY id_receta ASC
        `,
        [id_recetario]
      );


    return {

      ...recetario[0],

      recetas

    };

  }

};


module.exports = RecetarioModel;