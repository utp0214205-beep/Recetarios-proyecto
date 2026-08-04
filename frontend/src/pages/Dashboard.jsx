import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { obtenerRecetarios } from "../services/recetarioService";

import { obtenerRecetas } from "../services/recetaService";

import ListaRecetarios from "../components/recetario/ListaRecetarios";
import { alertaError } from "../utils/alertas";
import "../assets/styles/dashboard.css";

function Dashboard() {

    const { alumno } = useAuth();

    const navigate = useNavigate();

    const [misRecetarios, setMisRecetarios] = useState([]);

    const [totalRecetas, setTotalRecetas] = useState(0);

    const [totalPDF, setTotalPDF] = useState(0);

    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        if (alumno) {

            cargarRecetarios();

        }

    }, [alumno]);

    const cargarRecetarios = async () => {

        try {

            const data = await obtenerRecetarios(
                alumno.id_alumno
            );

            setMisRecetarios(data);

            let contadorRecetas = 0;

            for (const recetario of data) {

                const recetas = await obtenerRecetas(
                    recetario.id_recetario
                );

                contadorRecetas += recetas.length;

            }

            setTotalRecetas(contadorRecetas);

        } catch (error) {

            console.error(
                "Error cargando recetarios:",
                error
            );

            alertaError(
                "No fue posible cargar la información del Dashboard."
            );

        } finally {

            setCargando(false);

        }

    };

    const abrirRecetario = (recetario) => {

        navigate(
            `/recetarios/${recetario.id_recetario}`
        );

    };

    return (

        <div className="dashboard">

            <section className="welcome-card">

                <h1>

                    Bienvenido, {alumno?.nombre}

                </h1>

                <p>

                    Bienvenido a <strong>MISE EN TRACK</strong>, tu plataforma para administrar recetarios digitales, organizar tus prácticas y generar fichas técnicas profesionales.

                </p>

            </section>

            <section className="stats-container">

                <div className="stat-card">

                    <h2>

                        {

                            cargando

                                ? "..."

                                : misRecetarios.length

                        }

                    </h2>

                    <p>

                        Recetarios

                    </p>

                </div>

                <div className="stat-card">

                    <h2>

                        {

                            cargando

                                ? "..."

                                : totalRecetas

                        }

                    </h2>

                    <p>

                        Recetas

                    </p>

                </div>

                

            </section>

            <section className="actions">

                <h2>

                    Acciones rápidas

                </h2>

                <div className="actions-container">

                    <button
                        onClick={() => navigate("/recetarios")}
                    >

                        Administrar recetarios

                    </button>

                    <button
                        onClick={() => navigate("/perfil")}
                    >

                        Mi perfil

                    </button>

                </div>

            </section>

            <section className="mis-recetarios">

                <div className="recetarios-header">

                    <h2>

                        Últimos recetarios

                    </h2>

                    <button
                        className="btn-ver-todos"
                        onClick={() => navigate("/recetarios")}
                    >

                        Ver todos

                    </button>

                </div>

                <ListaRecetarios
                    recetarios={misRecetarios.slice(0, 3)}
                    onAbrir={abrirRecetario}
                />

            </section>

        </div>

    );

}

export default Dashboard;