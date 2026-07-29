// src/models/receta.model.js
const db = require('../config/db');

const RecetaModel = {
  // Lista rápida de recetas pertenecientes a un recetario específico
  listarPorRecetario: async (id_recetario) => {
    const query = `
      SELECT id_receta, nombre_platillo, asignatura, clasificacion, fecha, costo_total 
      FROM receta 
      WHERE id_recetario = ? 
      ORDER BY id_receta DESC
    `;
    const [rows] = await db.execute(query, [id_recetario]);
    return rows;
  },

  // Reconstrucción atómica y detallada de una receta completa
  obtenerDetalleCompleto: async (id_receta) => {
    // Consulta los datos principales de la receta
    const [receta] = await db.execute('SELECT * FROM receta WHERE id_receta = ?', [id_receta]);
    if (receta.length === 0) return null;

    // Consultas paralelas en las subtablas
    const [ingredientes] = await db.execute(`
      SELECT ir.*, i.nombre 
      FROM ingrediente_receta ir
      INNER JOIN ingrediente i ON ir.id_ingrediente = i.id_ingrediente
      WHERE ir.id_receta = ?
    `, [id_receta]);

    const [procedimiento] = await db.execute('SELECT * FROM procedimiento WHERE id_receta = ?', [id_receta]);
    const [tecnica] = await db.execute('SELECT * FROM tecnica_culinaria WHERE id_receta = ?', [id_receta]);
    const [equipo] = await db.execute('SELECT * FROM equipo WHERE id_receta = ?', [id_receta]);
    const [fotografias] = await db.execute('SELECT id_fotografia, imagen FROM fotografia WHERE id_receta = ?', [id_receta]);    
    const [infoComp] = await db.execute('SELECT * FROM informacion_complementaria WHERE id_receta = ?', [id_receta]);

    // Consolidamos el objeto completo JSON de respuesta
    return {
      ...receta[0],
      ingredientes,
      procedimiento: procedimiento[0] || null,
      tecnica_culinaria: tecnica[0] || null,
      equipo: equipo[0] || null,
      fotografias,
      informacion_complementaria: infoComp[0] || null
    };
  },
  // Agregar dentro de RecetaModel en src/models/receta.model.js
  getAllGlobal: async () => {
    const query = `
      SELECT r.id_receta, r.id_recetario, r.nombre_platillo, r.asignatura, 
            r.clasificacion, r.fecha, r.costo_total, rec.nombre AS recetario_nombre
      FROM receta r
      INNER JOIN recetario rec ON r.id_recetario = rec.id_recetario
      ORDER BY r.id_receta DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
  }
};

module.exports = RecetaModel;