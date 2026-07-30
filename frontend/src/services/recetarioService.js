import api from "./api";



// Obtener todos los recetarios del alumno
export const obtenerRecetarios = async (id_alumno) => {


    const response = await api.get(

        `/recetarios?id_alumno=${id_alumno}`

    );


    return response.data;

};






// Crear un nuevo recetario
export const crearRecetario = async (datos) => {


    const response = await api.post(

        "/recetarios",

        datos

    );


    return response.data;

};






// Obtener un recetario específico
export const obtenerRecetarioPorId = async (id) => {


    const response = await api.get(

        `/recetarios/${id}`

    );


    return response.data;

};






// Actualizar nombre u otros datos del recetario
export const actualizarRecetario = async (
    id,
    datos
) => {


    const response = await api.put(

        `/recetarios/${id}`,

        datos

    );


    return response.data;

};






// Eliminar recetario
export const eliminarRecetario = async (id) => {


    const response = await api.delete(

        `/recetarios/${id}`

    );


    return response.data;

};