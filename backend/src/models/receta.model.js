// src/models/receta.model.js

const db = require("../config/db");

const RecetaModel = {

    listarPorRecetario: async (id_recetario) => {

        const query = `
            SELECT
                id_receta,
                nombre_platillo,
                asignatura,
                clasificacion,
                fecha,
                costo_total
            FROM receta
            WHERE id_recetario = ?
            ORDER BY id_receta DESC
        `;

        const [rows] = await db.execute(
            query,
            [id_recetario]
        );

        return rows;

    },

    obtenerDetalleCompleto: async (id_receta) => {

       const [receta] = await db.execute(
            `
            SELECT
                *,
                DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha
            FROM receta
            WHERE id_receta=?
            `,
            [id_receta]
        );

        if (receta.length === 0) {

            return null;

        }

        const [ingredientes] = await db.execute(`
            SELECT
                ir.*,
                i.nombre
            FROM ingrediente_receta ir
            INNER JOIN ingrediente i
                ON ir.id_ingrediente=i.id_ingrediente
            WHERE ir.id_receta=?
        `,[id_receta]);

        const [procedimiento] = await db.execute(
            "SELECT * FROM procedimiento WHERE id_receta=?",
            [id_receta]
        );

        const [tecnica] = await db.execute(
            "SELECT * FROM tecnica_culinaria WHERE id_receta=?",
            [id_receta]
        );

        const [equipo] = await db.execute(
            "SELECT * FROM equipo WHERE id_receta=?",
            [id_receta]
        );

        const [fotografias] = await db.execute(
            `
            SELECT
                id_fotografia,
                imagen
            FROM fotografia
            WHERE id_receta=?
            `,
            [id_receta]
        );

        const [informacion] = await db.execute(
            `
            SELECT *
            FROM informacion_complementaria
            WHERE id_receta=?
            `,
            [id_receta]
        );

        return {

            ...receta[0],

            ingredientes: ingredientes || [],

            procedimiento:
                procedimiento[0] || {
                    mise_en_place: "",
                    instrucciones: ""
                },

            tecnica_culinaria:
                tecnica[0] || {
                    tipo_corte: "",
                    metodo_coccion: "",
                    tecnica_elaboracion: ""
                },

            equipo:
                equipo[0] || {
                    utensilios: "",
                    temperatura_coccion: "",
                    temperatura_servicio: "",
                    material_extra: "",
                    unidades_medicion: ""
                },

            fotografias:
                fotografias || [],

            informacion_complementaria:
                informacion[0] || {
                    historia: "",
                    conclusiones: "",
                    buenas_practicas: "",
                    referencias: ""
                }

        };

    },

    getAllGlobal: async () => {

        const query = `
            SELECT
                r.id_receta,
                r.id_recetario,
                r.nombre_platillo,
                r.asignatura,
                r.clasificacion,
                r.fecha,
                r.costo_total,
                rec.nombre AS recetario_nombre
            FROM receta r
            INNER JOIN recetario rec
                ON rec.id_recetario=r.id_recetario
            ORDER BY r.id_receta DESC
        `;

        const [rows] = await db.execute(query);

        return rows;

    }

};

module.exports = RecetaModel;