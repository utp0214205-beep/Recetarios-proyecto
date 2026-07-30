import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    obtenerRecetarioPorId
} from "../services/recetarioService";

import {
    obtenerRecetas
} from "../services/recetaService";

import "../assets/styles/recetario.css";


function RecetarioDetalle() {


    const { id } = useParams();

    const navigate = useNavigate();



    const [recetario, setRecetario] = useState(null);

    const [recetas, setRecetas] = useState([]);

    const [cargando, setCargando] = useState(true);




    useEffect(() => {

        cargarDatos();

    }, [id]);





    const cargarDatos = async () => {

        try {


            const datosRecetario =
                await obtenerRecetarioPorId(id);



            const datosRecetas =
                await obtenerRecetas(id);



            setRecetario(datosRecetario);

            setRecetas(datosRecetas);



        } catch (error) {


            console.error(
                "Error cargando el recetario:",
                error
            );


        } finally {


            setCargando(false);


        }

    };





    const nuevaReceta = () => {


        navigate(
            `/recetarios/${id}/nueva-receta`
        );


    };

    const abrirReceta = (idReceta) => {

        navigate(
            `/recetarios/${id}/recetas/${idReceta}`
        );

    };



    if (cargando) {

        return (

            <h2>

                Cargando recetario...

            </h2>

        );

    }





    if (!recetario) {

        return (

            <h2>

                El recetario no existe.

            </h2>

        );

    }






    return (

        <div className="recetario-detalle">





            <section className="encabezado-recetario">


                <h1>

                    📖 {recetario.nombre}

                </h1>



                <p>

                    Gestiona las recetas pertenecientes a este recetario.

                </p>




                <button

                    className="boton-nueva-receta"

                    onClick={nuevaReceta}

                >

                    + Nueva receta

                </button>



            </section>







            <section className="lista-recetas">



                <h2>

                    Mis recetas

                </h2>





                {

                    recetas.length === 0 ? (

                        <p>

                            No hay recetas registradas.

                        </p>


                    ) : (



                        recetas.map((receta) => (



                            <div
                                key={receta.id_receta}
                                className="tarjeta-receta"
                                onClick={() =>
                                    navigate(
                                        `/recetarios/${id}/recetas/${receta.id_receta}`
                                    )
                                }
                            >

                                <h3>

                                    {receta.nombre_platillo}

                                </h3>

                                <p>

                                    {receta.clasificacion || "Sin clasificación"}

                                </p>

                            </div>



                        ))


                    )


                }





            </section>





        </div>

    );


}


export default RecetarioDetalle;