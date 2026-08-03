import { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";

import {
    obtenerRecetarios
} from "../services/recetarioService";

import {
    obtenerRecetas
} from "../services/recetaService";

import "../assets/styles/perfil.css";

function Perfil() {

    const { alumno } = useAuth();

    const [totalRecetarios, setTotalRecetarios] = useState(0);

    const [totalRecetas, setTotalRecetas] = useState(0);

    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        cargarPerfil();

    }, []);

    const cargarPerfil = async () => {

        try {

            const recetarios = await obtenerRecetarios(

                alumno.id_alumno

            );

            setTotalRecetarios(

                recetarios.length

            );

            let contadorRecetas = 0;

            for (const recetario of recetarios) {

                const recetas = await obtenerRecetas(

                    recetario.id_recetario

                );

                contadorRecetas += recetas.length;

            }

            setTotalRecetas(

                contadorRecetas

            );

        } catch (error) {

            console.error(

                "Error cargando el perfil:",

                error

            );

        } finally {

            setCargando(false);

        }

    };

    if (cargando) {

        return (

            <h2>

                Cargando perfil...

            </h2>

        );

    }
    console.log(alumno);
    return (

        <div className="perfil">

            <section className="perfil-header">

                <span className="perfil-etiqueta">

                    MI PERFIL

                </span>

                <h1>

                    {alumno.nombre}{" "}

                    {alumno.apellido_paterno}{" "}

                    {alumno.apellido_materno}

                </h1>

                

            </section>

            <section className="perfil-contenido">

                <div className="perfil-card">

                    <h2>

                        Información personal

                    </h2>

                    <div className="perfil-info">

                        <div>

                            <span>

                                Nombre:

                            </span>

                            <strong>

                                {alumno.nombre}

                            </strong>

                        </div>

                        <div>

                            <span>

                                Apellido paterno:

                            </span>

                            <strong>

                                {alumno.apellido_paterno}

                            </strong>

                        </div>

                        <div>

                            <span>

                                Apellido materno:

                            </span>

                            <strong>

                                {alumno.apellido_materno}

                            </strong>

                        </div>

                        <div>

                            <span>

                                Correo:

                            </span>

                            <strong>

                                {alumno.correo}

                            </strong>

                        </div>

                        

                    </div>

                </div>

                <div className="perfil-card">

                    <h2>

                        Actividad

                    </h2>

                    <div className="estadisticas">

                        <div className="estadistica">

                            <h3>

                                {totalRecetarios}

                            </h3>

                            <p>

                                Recetarios

                            </p>

                        </div>

                        <div className="estadistica">

                            <h3>

                                {totalRecetas}

                            </h3>

                            <p>

                                Recetas

                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <footer className="perfil-footer">

                <p>

                    Recetario Digital Gastronomía

                </p>

                <span>

                    Versión 1.0

                </span>

            </footer>

        </div>

    );

}

export default Perfil;