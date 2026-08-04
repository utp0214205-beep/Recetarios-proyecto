import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import encabezadoFicha from "../assets/images/encabezado-ficha.png";
import {
    crearReceta,
    obtenerDetalleReceta,
    actualizarReceta
} from "../services/recetaService";

import {
    alertaError,
    alertaExito,
    alertaAdvertencia
} from "../utils/alertas";

import "../assets/styles/nuevaReceta.css";
import "../assets/styles/fichaReceta.css";

import FichaEdicionPagina1 
from "../components/receta/ficha-edicion/FichaEdicionPagina1";
import FichaEdicionPagina2 
from "../components/receta/ficha-edicion/FichaEdicionPagina2";



function NuevaReceta() {

    const { id, idReceta } = useParams();

    const navigate = useNavigate();

    const editando = Boolean(idReceta);

    const [cargando, setCargando] = useState(editando);

    const [datosReceta, setDatosReceta] = useState({

        nombre_platillo: "",
        asignatura: "",
        clasificacion: "",
        fecha: "",
        numero_practica: "",
        tiempo_preparacion: "",
        total_produccion: "",
        numero_porciones: "",
        cantidad_porcion: "",
        aporte_nutrimental: "",
        metodo_tiempo_conservacion: "",
        maridaje: "",
        costo_total: "",
        costo_por_porcion: "",

        ingredientes: [],

        procedimiento: {
            mise_en_place: "",
            instrucciones: ""
        },

        tecnica_culinaria: {
            tipo_corte: "",
            metodo_coccion: "",
            tecnica_elaboracion: ""
        },

        equipo: {
            utensilios: "",
            temperatura_coccion: "",
            temperatura_servicio: "",
            material_extra: "",
            unidades_medicion: ""
        },

        fotografias: [],

        informacion_complementaria: {
            historia: "",
            conclusiones: "",
            buenas_practicas: "",
            referencias: ""
        }

    });

    useEffect(() => {

        if (editando) {
            cargarReceta();
        }

    }, []);

    const cargarReceta = async () => {

        try {

            const receta = await obtenerDetalleReceta(
                id,
                idReceta
            );
            console.log("RECETA COMPLETA");
            console.log(receta);

            console.log("FOTOGRAFIAS");
            console.log(receta.fotografias);

            console.log("PRIMERA FOTO");
            console.log(receta.fotografias?.[0]);

            console.log(receta.fotografias[0]);
            console.log(receta.fotografias[0].imagen);

            setDatosReceta({

                ...receta,


                fecha:
                    receta.fecha
                        ? receta.fecha.substring(0, 10)
                        : "",


                ingredientes:
                    receta.ingredientes || [],


                procedimiento:
                    receta.procedimiento || {
                        mise_en_place: "",
                        instrucciones: ""
                    },


                tecnica_culinaria:
                    receta.tecnica_culinaria || {
                        tipo_corte: "",
                        metodo_coccion: "",
                        tecnica_elaboracion: ""
                    },


                equipo:
                    receta.equipo || {
                        utensilios: "",
                        temperatura_coccion: "",
                        temperatura_servicio: "",
                        material_extra: "",
                        unidades_medicion: ""
                    },

                
                fotografias:

                receta.fotografias?.length
                    ? [
                        {
                            ...receta.fotografias[0],
                            preview:
                                `data:image/jpeg;base64,${receta.fotografias[0].imagen}`
                        }
                    ]
                    : [],


                informacion_complementaria:
                    receta.informacion_complementaria || {
                        historia: "",
                        conclusiones: "",
                        buenas_practicas: "",
                        referencias: ""
                    }

            });


        } catch (error) {

            console.error(error);

            alertaError(
                "No fue posible cargar la receta."
            );

        } finally {

            setCargando(false);

        }

    };
    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setDatosReceta((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const actualizarIngredientes = (ingredientes) => {

        setDatosReceta((prev) => ({
            ...prev,
            ingredientes
        }));

    };

    const actualizarProcedimiento = (e) => {

        const { name, value } = e.target;

        setDatosReceta((prev) => ({
            ...prev,
            procedimiento: {
                ...prev.procedimiento,
                [name]: value
            }
        }));

    };

    const actualizarTecnica = (e) => {

        const { name, value } = e.target;

        setDatosReceta((prev) => ({
            ...prev,
            tecnica_culinaria: {
                ...prev.tecnica_culinaria,
                [name]: value
            }
        }));

    };

    const actualizarEquipo = (e) => {

        const { name, value } = e.target;

        setDatosReceta((prev) => ({
            ...prev,
            equipo: {
                ...prev.equipo,
                [name]: value
            }
        }));

    };

    const actualizarInformacion = (e) => {

        const { name, value } = e.target;

        setDatosReceta((prev) => ({
            ...prev,
            informacion_complementaria: {
                ...prev.informacion_complementaria,
                [name]: value
            }
        }));

    };

    const actualizarFotografias = (fotografias) => {

        setDatosReceta((prev) => ({
            ...prev,
            fotografias
        }));

    };

    const guardar = async (e) => {

        e.preventDefault();

        if (!datosReceta.nombre_platillo.trim()) {

            alertaAdvertencia(
                "Ingresa el nombre de la receta."
            );

            return;

        }

        console.log(
            "FOTOGRAFIAS ANTES DE GUARDAR:",
            datosReceta.fotografias
        );

        try {

            if (editando) {

                await actualizarReceta(
                    id,
                    idReceta,
                    datosReceta
                );

                alertaExito(
                    "Receta actualizada correctamente."
                );

            } else {

                await crearReceta(
                    id,
                    datosReceta
                );

                alertaExito(
                    "Receta creada correctamente."
                );

            }

            navigate(`/recetarios/${id}`);

        } catch (error) {

            console.error(
                "ERROR COMPLETO:",
                error
            );

            console.log(
                "RESPUESTA:",
                error.response
            );

            console.log(
                "DATA:",
                error.response?.data
            );

            alertaError(

                error.response?.data?.message ??

                "No fue posible guardar la receta."

            );

        }

    };

    if (cargando) {

        return <h2>Cargando receta...</h2>;

    }

    return (

    <div className="nueva-receta">


        <h1>
            {editando ? "Editar receta" : "Nueva receta"}
        </h1>


        <p>
            Completa la información de la receta.
        </p>



        <form onSubmit={guardar}>


            <FichaEdicionPagina1

                datosReceta={datosReceta}

                manejarCambio={manejarCambio}

                actualizarIngredientes={
                    actualizarIngredientes
                }

                actualizarInformacion={
                    actualizarInformacion
                }

            />

            <FichaEdicionPagina2

                datosReceta={datosReceta}

                actualizarProcedimiento={
                    actualizarProcedimiento
                }

                actualizarTecnica={
                    actualizarTecnica
                }

                actualizarEquipo={
                    actualizarEquipo
                }

                actualizarFotografias={
                    actualizarFotografias
                }

                actualizarInformacion={
                    actualizarInformacion
                }

            />



            <button type="submit">


                {
                    editando
                        ? "Guardar cambios"
                        : "Guardar receta"
                }


            </button>



        </form>


    </div>

);

}

export default NuevaReceta;