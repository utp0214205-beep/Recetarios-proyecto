import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    crearReceta,
    obtenerDetalleReceta,
    actualizarReceta
} from "../services/recetaService";

import "../assets/styles/nuevaReceta.css";

import FormDatosGenerales from "../components/receta/FormDatosGenerales";
import FormIngredientes from "../components/receta/FormIngredientes";
import FormProcedimiento from "../components/receta/FormProcedimiento";
import FormTecnicaCulinaria from "../components/receta/FormTecnicaCulinaria";
import FormEquipo from "../components/receta/FormEquipo";
import FormInformacionComplementaria from "../components/receta/FormInformacionComplementaria";
import FormFotografias from "../components/receta/FormFotografias";

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

            alert("No fue posible cargar la receta.");

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

                alert("Receta actualizada correctamente.");

            } else {

                await crearReceta(
                    id,
                    datosReceta
                );

                alert("Receta creada correctamente.");

            }

            navigate(`/recetarios/${id}`);

        } catch (error) {

            console.error("ERROR COMPLETO:", error);

            console.log("RESPUESTA:", error.response);

            console.log("DATA:", error.response?.data);

            alert(
                JSON.stringify(error.response?.data)
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

                <FormDatosGenerales
                    datos={datosReceta}
                    onChange={manejarCambio}
                />

                <FormIngredientes
                    ingredientes={datosReceta.ingredientes}
                    setIngredientes={actualizarIngredientes}
                />

                <FormProcedimiento
                    procedimiento={datosReceta.procedimiento}
                    onChange={actualizarProcedimiento}
                />

                <FormTecnicaCulinaria
                    tecnica={datosReceta.tecnica_culinaria}
                    onChange={actualizarTecnica}
                />

                <FormEquipo
                    equipo={datosReceta.equipo}
                    onChange={actualizarEquipo}
                />

                <FormInformacionComplementaria
                    informacion={datosReceta.informacion_complementaria}
                    onChange={actualizarInformacion}
                />

                <FormFotografias
                    fotografias={datosReceta.fotografias}
                    setFotografias={actualizarFotografias}
                />

                <button type="submit">

                    {editando
                        ? "Guardar cambios"
                        : "Guardar receta"}

                </button>

            </form>

        </div>

    );

}

export default NuevaReceta;