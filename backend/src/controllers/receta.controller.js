const RecetaService = require("../services/receta.service");
const RecetaModel = require("../models/receta.model");

const RecetaController = {

    crear: async (req, res) => {

        try {

            const { id_recetario } = req.params;

            const datosReceta = req.body;

            if (!datosReceta.nombre_platillo) {

                return res.status(400).json({
                    message: "El nombre del platillo es obligatorio."
                });

            }

            const nuevaRecetaId =
                await RecetaService.crearRecetaCompleta(
                    id_recetario,
                    datosReceta
                );

            return res.status(201).json({

                message: "¡Receta creada con éxito!",

                id_receta: nuevaRecetaId

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Error interno del servidor."
            });

        }

    },

    listarPorRecetario: async (req, res) => {

        try {

            const { id_recetario } = req.params;

            const recetas =
                await RecetaModel.listarPorRecetario(
                    id_recetario
                );

            return res.status(200).json(recetas);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Error al listar recetas."
            });

        }

    },

    obtenerDetalle: async (req, res) => {

        try {

            const {
                id_recetario,
                id_receta
            } = req.params;

            const receta =
                await RecetaModel.obtenerDetalleCompleto(
                    id_receta
                );

            if (
                !receta ||
                receta.id_recetario !== Number(id_recetario)
            ) {

                return res.status(404).json({
                    message: "La receta no existe."
                });

            }

            return res.status(200).json(receta);

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message: "Error al obtener receta."
            });

        }

    },

    actualizar: async (req, res) => {

        try {

            const {
                id_recetario,
                id_receta
            } = req.params;

            await RecetaService.actualizarRecetaCompleta(

                id_recetario,

                id_receta,

                req.body

            );

            return res.status(200).json({

                message: "Receta actualizada correctamente."

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                message: "Error al actualizar la receta."

            });

        }

    },

    getAll: async (req, res) => {

        try {

            const recetas =
                await RecetaModel.getAllGlobal();

            return res.status(200).json(recetas);

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                message: "Error al obtener recetas."

            });

        }

    }

};

module.exports = RecetaController;