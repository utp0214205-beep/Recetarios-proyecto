import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { obtenerRecetarios } from "../services/recetarioService";

import ListaRecetarios from "../components/recetario/ListaRecetarios";

import "../assets/styles/dashboard.css";

function Dashboard() {

    const { alumno } = useAuth();

    const navigate = useNavigate();

    const [misRecetarios, setMisRecetarios] = useState([]);

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

        } catch (error) {

            console.error(
                "Error cargando recetarios:",
                error
            );

        } finally {

            setCargando(false);

        }

    };



    const abrirRecetario = (recetario) => {

        navigate(`/recetarios/${recetario.id_recetario}`);

    };



    return (

        <div className="dashboard">

            <section className="welcome-card">

                <h1>

                    Bienvenido {alumno?.nombre}

                </h1>

                <p>

                    Gestiona tus recetarios digitales de forma rápida y organizada.

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

                        0

                    </h2>

                    <p>

                        Recetas

                    </p>

                </div>



                <div className="stat-card">

                    <h2>

                        0

                    </h2>

                    <p>

                        Pendientes

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



                    <button>

                        Ver recetas

                    </button>



                    <button
                        onClick={() => navigate("/perfil")}
                    >

                        Editar perfil

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