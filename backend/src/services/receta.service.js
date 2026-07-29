// src/services/receta.service.js
const pool = require('../config/db');

const RecetaService = {
  crearRecetaCompleta: async (id_recetario, datosReceta) => {
    // 1. Obtener una conexión exclusiva del Pool para la transacción
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // 2. Insertar en la tabla principal: receta
      const queryReceta = `
        INSERT INTO receta (
          id_recetario, asignatura, clasificacion, nombre_platillo, fecha, numero_practica,
          tiempo_preparacion, total_produccion, numero_porciones, cantidad_porcion,
          aporte_nutrimental, metodo_tiempo_conservacion, maridaje, costo_total, costo_por_porcion
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const [resReceta] = await connection.execute(queryReceta, [
        id_recetario,
        datosReceta.asignatura || null,
        datosReceta.clasificacion || null,
        datosReceta.nombre_platillo,
        datosReceta.fecha || null,
        datosReceta.numero_practica || null,
        datosReceta.tiempo_preparacion || null,
        datosReceta.total_produccion || null,
        datosReceta.numero_porciones || null,
        datosReceta.cantidad_porcion || null,
        datosReceta.aporte_nutrimental || null,
        datosReceta.metodo_tiempo_conservacion || null,
        datosReceta.maridaje || null,
        datosReceta.costo_total || null,
        datosReceta.costo_por_porcion || null
      ]);

      const id_receta = resReceta.insertId;

      // 3. Insertar Ingredientes e Ingrediente_Receta
      if (datosReceta.ingredientes && datosReceta.ingredientes.length > 0) {
        for (const ing of datosReceta.ingredientes) {
          let id_ingrediente;

          // Verificar si el ingrediente ya existe de forma global
          const [existeIng] = await connection.execute('SELECT id_ingrediente FROM ingrediente WHERE nombre = ?', [ing.nombre]);
          
          if (existeIng.length > 0) {
            id_ingrediente = existeIng[0].id_ingrediente;
          } else {
            // Si no existe, se registra de manera global
            const [resNuevoIng] = await connection.execute('INSERT INTO ingrediente (nombre) VALUES (?)', [ing.nombre]);
            id_ingrediente = resNuevoIng.insertId;
          }

          // Insertar la relación intermedia
          // Localiza esta sección dentro de src/services/receta.service.js

          // Insertar la relación intermedia
          const queryIngReceta = `
            INSERT INTO ingrediente_receta (
              id_receta, id_ingrediente, cantidad, unidad, costo_unitario, rendimiento, importe
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
          `;

          // --- AGREGA ESTA LIMPIEZA ANTES DE EJECUTAR EL QUERY ---
          let rendimientoLimpio = ing.rendimiento;
          if (typeof rendimientoLimpio === 'string') {
            // Quita el '%' y cualquier espacio en blanco, luego lo convierte a flotante
            rendimientoLimpio = parseFloat(rendimientoLimpio.replace('%', '').trim());
          }
          // --------------------------------------------------------

          await connection.execute(queryIngReceta, [
            id_receta, 
            id_ingrediente, 
            ing.cantidad || null, 
            ing.unidad || null,
            ing.costo_unitario || null, 
            isNaN(rendimientoLimpio) ? null : rendimientoLimpio, // Usamos el valor sanitizado con seguridad
            ing.importe || null
          ]);
        }
      }

      // 4. Insertar Procedimiento
      if (datosReceta.procedimiento) {
        const queryProc = 'INSERT INTO procedimiento (id_receta, mise_en_place, instrucciones) VALUES (?, ?, ?)';
        await connection.execute(queryProc, [
          id_receta,
          datosReceta.procedimiento.mise_en_place || null,
          datosReceta.procedimiento.instrucciones || null
        ]);
      }

      // 5. Insertar Técnica Culinaria
      if (datosReceta.tecnica_culinaria) {
        const queryTec = `
          INSERT INTO tecnica_culinaria (id_receta, tipo_corte, metodo_coccion, tecnica_elaboracion) 
          VALUES (?, ?, ?, ?)
        `;
        await connection.execute(queryTec, [
          id_receta,
          datosReceta.tecnica_culinaria.tipo_corte || null,
          datosReceta.tecnica_culinaria.metodo_coccion || null,
          datosReceta.tecnica_culinaria.tecnica_elaboracion || null
        ]);
      }

      // 6. Insertar Equipo
      if (datosReceta.equipo) {
        const queryEq = `
          INSERT INTO equipo (
            id_receta, utensilios, temperatura_coccion, temperatura_servicio, material_extra, unidades_medicion
          ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        await connection.execute(queryEq, [
          id_receta,
          datosReceta.equipo.utensilios || null,
          datosReceta.equipo.temperatura_coccion || null,
          datosReceta.equipo.temperatura_servicio || null,
          datosReceta.equipo.material_extra || null,
          datosReceta.equipo.unidades_medicion || null
        ]);
      }

      // 7. Insertar Fotografías (Manejo directo de Base64 en la base de datos)
      if (datosReceta.fotografias && datosReceta.fotografias.length > 0) {
        const queryFoto = 'INSERT INTO fotografia (id_receta, imagen) VALUES (?, ?)';
        for (const foto of datosReceta.fotografias) {
        // Ahora solo se envía la imagen Base64 pura
          await connection.execute(queryFoto, [id_receta, foto.imagen]);
        }
      }

      // 8. Insertar Información Complementaria
      if (datosReceta.informacion_complementaria) {
        const queryInfo = `
          INSERT INTO informacion_complementaria (id_receta, historia, conclusiones, buenas_practicas, referencias) 
          VALUES (?, ?, ?, ?, ?)
        `;
        await connection.execute(queryInfo, [
          id_receta,
          datosReceta.informacion_complementaria.historia || null,
          datosReceta.informacion_complementaria.conclusiones || null,
          datosReceta.informacion_complementaria.buenas_practicas || null,
          datosReceta.informacion_complementaria.referencias || null
        ]);
      }

      // Si todo se ejecutó correctamente, guardamos definitivamente en la BD
      await connection.commit();
      return id_receta;

    } catch (error) {
      // Si ocurre CUALQUIER error, deshacemos todos los inserts previos de esta petición
      await connection.rollback();
      throw error;
    } finally {
      // Liberamos la conexión de vuelta al Pool
      connection.release();
    }
  }
};

module.exports = RecetaService;