import api from "./api";

export const obtenerRecetas = async (idRecetario) => {

    const response = await api.get(
        `/recetarios/${idRecetario}/recetas`
    );

    return response.data;

};

export const obtenerDetalleReceta = async (
    idRecetario,
    idReceta
) => {

    const response = await api.get(
        `/recetarios/${idRecetario}/recetas/${idReceta}`
    );

    return response.data;

};

export const crearReceta = async (
    idRecetario,
    datos
) => {

    const response = await api.post(
        `/recetarios/${idRecetario}/recetas`,
        datos
    );

    return response.data;

};