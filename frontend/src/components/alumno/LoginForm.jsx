import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { login } from "../../services/alumno.service";
import { AuthContext } from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { iniciarSesion } = useContext(AuthContext);

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo || !contrasena) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Completa todos los campos.",
      });
      return;
    }

    try {
      setCargando(true);

      const respuesta = await login(correo, contrasena);

        console.log("RESPUESTA COMPLETA:", respuesta);
        console.log("ALUMNO:", respuesta.alumno);

        iniciarSesion(respuesta.alumno);

        console.log("LOCAL STORAGE:", localStorage.getItem("alumno"));

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: `Hola ${respuesta.alumno.nombre}`,
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/dashboard");

    } catch (error) {

        console.log(error);

        console.log(error.response);

        console.log(error.message);

        Swal.fire({
            icon: "error",
            title: "Error",
            text:
            error.response?.data?.message ||
            error.message,
        });

        } finally {

      setCargando(false);

    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <div>

        <label>Correo electrónico</label>

        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />

      </div>

      <div>

        <label>Contraseña</label>

        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />

      </div>

      <button type="submit" disabled={cargando}>
        {cargando ? "Ingresando..." : "Iniciar sesión"}
      </button>

    </form>
  );
}

export default LoginForm;