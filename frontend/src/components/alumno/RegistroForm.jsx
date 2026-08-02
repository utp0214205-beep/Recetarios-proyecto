import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

import { registrarAlumno } from "../../services/alumno.service";

function RegistroForm() {

    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        matricula: "",
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: ""
    });

    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const {
            matricula,
            nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            contrasena,
            confirmarContrasena
        } = datos;

        if (
            !matricula ||
            !nombre ||
            !apellido_paterno ||
            !apellido_materno ||
            !correo ||
            !contrasena ||
            !confirmarContrasena
        ) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Completa todos los campos."
            });

            return;
        }

        if (contrasena !== confirmarContrasena) {

            Swal.fire({
                icon: "warning",
                title: "Contraseñas diferentes",
                text: "Las contraseñas no coinciden."
            });

            return;
        }

        try {

            setCargando(true);

            await registrarAlumno({

                matricula,
                nombre,
                apellido_paterno,
                apellido_materno,
                correo,
                contrasena

            });

            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: "Ahora puedes iniciar sesión.",
                timer: 1500,
                showConfirmButton: false
            });

            navigate("/login");

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    error.message
            });

        } finally {

            setCargando(false);

        }

    };

    return (

        <form className="login-form" onSubmit={handleSubmit}>

            <div>

                <label>Matrícula</label>

                <input
                    type="text"
                    name="matricula"
                    value={datos.matricula}
                    onChange={handleChange}
                    placeholder="UTP0000000"
                />

            </div>

            <div>
                <label>Nombre</label>

                <input
                    type="text"
                    name="nombre"
                    value={datos.nombre}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Apellido paterno</label>

                <input
                    type="text"
                    name="apellido_paterno"
                    value={datos.apellido_paterno}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Apellido materno</label>

                <input
                    type="text"
                    name="apellido_materno"
                    value={datos.apellido_materno}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Correo electrónico</label>

                <input
                    type="email"
                    name="correo"
                    value={datos.correo}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Contraseña</label>

                <input
                    type="password"
                    name="contrasena"
                    value={datos.contrasena}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Confirmar contraseña</label>

                <input
                    type="password"
                    name="confirmarContrasena"
                    value={datos.confirmarContrasena}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                disabled={cargando}
            >
                {cargando ? "Registrando..." : "Crear cuenta"}
            </button>

            <hr className="login-divider" />

            <div className="registro-link">

                <span>

                    ¿Ya tienes una cuenta?

                </span>

                <Link to="/login">

                    Iniciar sesión

                </Link>

            </div>

        </form>

    );

}

export default RegistroForm;