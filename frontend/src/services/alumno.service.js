import api from "./api";

export const login = async (correo, contrasena) => {

  const response = await api.post("/alumnos/login", {
    correo,
    contrasena,
  });

  return response.data;

};
export const registrarAlumno = async (datos) => {

    const response = await api.post("/alumnos/registro", datos);

    return response.data;

};