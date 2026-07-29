import api from "./api";

export const obtenerRecetarios = async () => {

    const response = await api.get("/recetarios");

    return response.data;

};

export const crearRecetario = async (datos) => {

    const response = await api.post("/recetarios", datos);

    return response.data;

};

export const actualizarRecetario = async (id, datos) => {

    const response = await api.put(`/recetarios/${id}`, datos);

    return response.data;

};

export const eliminarRecetario = async (id) => {

    const response = await api.delete(`/recetarios/${id}`);

    return response.data;

};