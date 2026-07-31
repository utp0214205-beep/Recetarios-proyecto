// src/services/receta.service.js

const pool = require("../config/db");

const RecetaService = {

    crearRecetaCompleta: async (id_recetario, datosReceta) => {

        const connection = await pool.getConnection();

        try {

            await connection.beginTransaction();

            // ===========================
            // RECETA
            // ===========================

            const queryReceta = `
                INSERT INTO receta (
                    id_recetario,
                    asignatura,
                    clasificacion,
                    nombre_platillo,
                    fecha,
                    numero_practica,
                    tiempo_preparacion,
                    total_produccion,
                    numero_porciones,
                    cantidad_porcion,
                    aporte_nutrimental,
                    metodo_tiempo_conservacion,
                    maridaje,
                    costo_total,
                    costo_por_porcion
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            const [resultado] = await connection.execute(
                queryReceta,
                [
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
                ]
            );

            const id_receta = resultado.insertId;

            // ===========================
            // INGREDIENTES
            // ===========================

            if (
                datosReceta.ingredientes &&
                datosReceta.ingredientes.length > 0
            ) {

                for (const ing of datosReceta.ingredientes) {

                    let id_ingrediente;

                    const [existente] = await connection.execute(
                        `
                        SELECT id_ingrediente
                        FROM ingrediente
                        WHERE nombre = ?
                        `,
                        [ing.nombre]
                    );

                    if (existente.length > 0) {

                        id_ingrediente =
                            existente[0].id_ingrediente;

                    } else {

                        const [nuevo] =
                            await connection.execute(
                                `
                                INSERT INTO ingrediente (nombre)
                                VALUES (?)
                                `,
                                [ing.nombre]
                            );

                        id_ingrediente =
                            nuevo.insertId;

                    }

                    let rendimiento =
                        ing.rendimiento;

                    if (
                        typeof rendimiento === "string"
                    ) {

                        rendimiento = parseFloat(
                            rendimiento
                                .replace("%", "")
                                .trim()
                        );

                    }

                    await connection.execute(
                        `
                        INSERT INTO ingrediente_receta
                        (
                            id_receta,
                            id_ingrediente,
                            cantidad,
                            unidad,
                            costo_unitario,
                            rendimiento,
                            importe
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                        `,
                        [
                            id_receta,
                            id_ingrediente,
                            ing.cantidad || null,
                            ing.unidad || null,
                            ing.costo_unitario || null,
                            isNaN(rendimiento)
                                ? null
                                : rendimiento,
                            ing.importe || null
                        ]
                    );

                }

            }

            // ===========================
            // PROCEDIMIENTO
            // ===========================

            if (datosReceta.procedimiento) {

                await connection.execute(
                    `
                    INSERT INTO procedimiento
                    (
                        id_receta,
                        mise_en_place,
                        instrucciones
                    )
                    VALUES (?, ?, ?)
                    `,
                    [
                        id_receta,
                        datosReceta.procedimiento.mise_en_place || null,
                        datosReceta.procedimiento.instrucciones || null
                    ]
                );

            }

            // ===========================
            // TECNICA
            // ===========================

            if (datosReceta.tecnica_culinaria) {

                await connection.execute(
                    `
                    INSERT INTO tecnica_culinaria
                    (
                        id_receta,
                        tipo_corte,
                        metodo_coccion,
                        tecnica_elaboracion
                    )
                    VALUES (?, ?, ?, ?)
                    `,
                    [
                        id_receta,
                        datosReceta.tecnica_culinaria.tipo_corte || null,
                        datosReceta.tecnica_culinaria.metodo_coccion || null,
                        datosReceta.tecnica_culinaria.tecnica_elaboracion || null
                    ]
                );

            }

            // ===========================
            // EQUIPO
            // ===========================

            if (datosReceta.equipo) {

                await connection.execute(
                    `
                    INSERT INTO equipo
                    (
                        id_receta,
                        utensilios,
                        temperatura_coccion,
                        temperatura_servicio,
                        material_extra,
                        unidades_medicion
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                    `,
                    [
                        id_receta,
                        datosReceta.equipo.utensilios || null,
                        datosReceta.equipo.temperatura_coccion || null,
                        datosReceta.equipo.temperatura_servicio || null,
                        datosReceta.equipo.material_extra || null,
                        datosReceta.equipo.unidades_medicion || null
                    ]
                );

            }

            // ===========================
            // FOTOGRAFIAS
            // ===========================

            if (
                datosReceta.fotografias &&
                datosReceta.fotografias.length > 0
            ) {

                for (const foto of datosReceta.fotografias) {

                    await connection.execute(
                        `
                        INSERT INTO fotografia
                        (
                            id_receta,
                            imagen
                        )
                        VALUES (?, ?)
                        `,
                        [
                            id_receta,
                            foto.imagen
                        ]
                    );

                }

            }

            // ===========================
            // INFORMACION COMPLEMENTARIA
            // ===========================

            if (
                datosReceta.informacion_complementaria
            ) {

                await connection.execute(
                    `
                    INSERT INTO informacion_complementaria
                    (
                        id_receta,
                        historia,
                        conclusiones,
                        buenas_practicas,
                        referencias
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        id_receta,
                        datosReceta.informacion_complementaria.historia || null,
                        datosReceta.informacion_complementaria.conclusiones || null,
                        datosReceta.informacion_complementaria.buenas_practicas || null,
                        datosReceta.informacion_complementaria.referencias || null
                    ]
                );

            }

            await connection.commit();

            return id_receta;

        } catch (error) {

            await connection.rollback();

            throw error;

        } finally {

            connection.release();

        }

    },
        actualizarRecetaCompleta: async (
        id_receta,
        datosReceta
    ) => {

        const connection = await pool.getConnection();

        try {

            await connection.beginTransaction();

            // =====================================
            // ACTUALIZAR RECETA
            // =====================================

            await connection.execute(
                `
                UPDATE receta
                SET
                    asignatura=?,
                    clasificacion=?,
                    nombre_platillo=?,
                    fecha=?,
                    numero_practica=?,
                    tiempo_preparacion=?,
                    total_produccion=?,
                    numero_porciones=?,
                    cantidad_porcion=?,
                    aporte_nutrimental=?,
                    metodo_tiempo_conservacion=?,
                    maridaje=?,
                    costo_total=?,
                    costo_por_porcion=?
                WHERE id_receta=?
                `,
                [
                    datosReceta.asignatura,
                    datosReceta.clasificacion,
                    datosReceta.nombre_platillo,
                    datosReceta.fecha,
                    datosReceta.numero_practica,
                    datosReceta.tiempo_preparacion,
                    datosReceta.total_produccion,
                    datosReceta.numero_porciones,
                    datosReceta.cantidad_porcion,
                    datosReceta.aporte_nutrimental,
                    datosReceta.metodo_tiempo_conservacion,
                    datosReceta.maridaje,
                    datosReceta.costo_total,
                    datosReceta.costo_por_porcion,
                    id_receta
                ]
            );

            // =====================================
            // BORRAR INFORMACIÓN ANTERIOR
            // =====================================

            await connection.execute(
                "DELETE FROM ingrediente_receta WHERE id_receta=?",
                [id_receta]
            );

            await connection.execute(
                "DELETE FROM procedimiento WHERE id_receta=?",
                [id_receta]
            );

            await connection.execute(
                "DELETE FROM tecnica_culinaria WHERE id_receta=?",
                [id_receta]
            );

            await connection.execute(
                "DELETE FROM equipo WHERE id_receta=?",
                [id_receta]
            );

            await connection.execute(
                "DELETE FROM fotografia WHERE id_receta=?",
                [id_receta]
            );

            await connection.execute(
                "DELETE FROM informacion_complementaria WHERE id_receta=?",
                [id_receta]
            );

            // =====================================
            // INGREDIENTES
            // =====================================

            if (datosReceta.ingredientes?.length) {

                for (const ing of datosReceta.ingredientes) {

                    let id_ingrediente;

                    const [existe] = await connection.execute(
                        "SELECT id_ingrediente FROM ingrediente WHERE nombre=?",
                        [ing.nombre]
                    );

                    if (existe.length > 0) {

                        id_ingrediente =
                            existe[0].id_ingrediente;

                    } else {

                        const [nuevo] =
                            await connection.execute(
                                "INSERT INTO ingrediente(nombre) VALUES(?)",
                                [ing.nombre]
                            );

                        id_ingrediente =
                            nuevo.insertId;

                    }

                    let rendimiento =
                        ing.rendimiento;

                    if (
                        typeof rendimiento === "string"
                    ) {

                        rendimiento = parseFloat(
                            rendimiento
                                .replace("%", "")
                                .trim()
                        );

                    }

                    await connection.execute(
                        `
                        INSERT INTO ingrediente_receta
                        (
                            id_receta,
                            id_ingrediente,
                            cantidad,
                            unidad,
                            costo_unitario,
                            rendimiento,
                            importe
                        )
                        VALUES (?, ?, ?, ?, ?, ?, ?)
                        `,
                        [
                            id_receta,
                            id_ingrediente,
                            ing.cantidad,
                            ing.unidad,
                            ing.costo_unitario,
                            isNaN(rendimiento)
                                ? null
                                : rendimiento,
                            ing.importe
                        ]
                    );

                }

            }

            // =====================================
            // PROCEDIMIENTO
            // =====================================

            if (datosReceta.procedimiento) {

                await connection.execute(
                    `
                    INSERT INTO procedimiento
                    (
                        id_receta,
                        mise_en_place,
                        instrucciones
                    )
                    VALUES (?, ?, ?)
                    `,
                    [
                        id_receta,
                        datosReceta.procedimiento.mise_en_place,
                        datosReceta.procedimiento.instrucciones
                    ]
                );

            }

            // =====================================
            // TÉCNICA
            // =====================================

            if (datosReceta.tecnica_culinaria) {

                await connection.execute(
                    `
                    INSERT INTO tecnica_culinaria
                    (
                        id_receta,
                        tipo_corte,
                        metodo_coccion,
                        tecnica_elaboracion
                    )
                    VALUES (?, ?, ?, ?)
                    `,
                    [
                        id_receta,
                        datosReceta.tecnica_culinaria.tipo_corte,
                        datosReceta.tecnica_culinaria.metodo_coccion,
                        datosReceta.tecnica_culinaria.tecnica_elaboracion
                    ]
                );

            }

            // =====================================
            // EQUIPO
            // =====================================

            if (datosReceta.equipo) {

                await connection.execute(
                    `
                    INSERT INTO equipo
                    (
                        id_receta,
                        utensilios,
                        temperatura_coccion,
                        temperatura_servicio,
                        material_extra,
                        unidades_medicion
                    )
                    VALUES (?, ?, ?, ?, ?, ?)
                    `,
                    [
                        id_receta,
                        datosReceta.equipo.utensilios,
                        datosReceta.equipo.temperatura_coccion,
                        datosReceta.equipo.temperatura_servicio,
                        datosReceta.equipo.material_extra,
                        datosReceta.equipo.unidades_medicion
                    ]
                );

            }

            // =====================================
            // FOTOGRAFÍAS
            // =====================================

            if (datosReceta.fotografias?.length) {

                for (const foto of datosReceta.fotografias) {

                    await connection.execute(
                        `
                        INSERT INTO fotografia
                        (
                            id_receta,
                            imagen
                        )
                        VALUES (?, ?)
                        `,
                        [
                            id_receta,
                            foto.imagen
                        ]
                    );

                }

            }

            // =====================================
            // INFORMACIÓN COMPLEMENTARIA
            // =====================================

            if (
                datosReceta.informacion_complementaria
            ) {

                await connection.execute(
                    `
                    INSERT INTO informacion_complementaria
                    (
                        id_receta,
                        historia,
                        conclusiones,
                        buenas_practicas,
                        referencias
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        id_receta,
                        datosReceta.informacion_complementaria.historia,
                        datosReceta.informacion_complementaria.conclusiones,
                        datosReceta.informacion_complementaria.buenas_practicas,
                        datosReceta.informacion_complementaria.referencias
                    ]
                );

            }

            await connection.commit();

        } catch (error) {

            await connection.rollback();

            throw error;

        } finally {

            connection.release();

        }

    }

};

module.exports = RecetaService;