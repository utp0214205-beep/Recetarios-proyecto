import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import {
    obtenerRecetarios,
    crearRecetario
} from "../services/recetarioService";

import FormRecetario from "../components/recetario/FormRecetario";
import ListaRecetarios from "../components/recetario/ListaRecetarios";

import "../assets/styles/dashboard.css";


function Dashboard() {

    const { alumno } = useAuth();


    const [misRecetarios, setMisRecetarios] = useState([]);

    const [cargando, setCargando] = useState(true);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);




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







    const guardarRecetario = async ({ nombre }) => {

        try {


            await crearRecetario({

                id_alumno: alumno.id_alumno,

                nombre

            });



            await cargarRecetarios();



            setMostrarFormulario(false);



        } catch (error) {


            console.error(
                "Error al crear el recetario:",
                error
            );


        }

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

                        onClick={() => setMostrarFormulario(true)}

                    >

                        + Nuevo recetario

                    </button>




                    <button>

                        Ver recetas

                    </button>




                    <button>

                        Editar perfil

                    </button>



                </div>


            </section>








            {
                mostrarFormulario && (

                    <FormRecetario

                        onGuardar={guardarRecetario}

                        onCancelar={() => setMostrarFormulario(false)}

                    />

                )
            }








            <section className="mis-recetarios">


                <h2>

                    Mis Recetarios

                </h2>




                <ListaRecetarios

                    recetarios={misRecetarios}

                />



            </section>





        </div>

    );

}


export default Dashboard;