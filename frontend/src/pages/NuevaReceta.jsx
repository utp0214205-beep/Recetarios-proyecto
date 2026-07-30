import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { crearReceta } from "../services/recetaService";

import FormDatosGenerales from "../components/receta/FormDatosGenerales";
import FormIngredientes from "../components/receta/FormIngredientes";
import FormProcedimiento from "../components/receta/FormProcedimiento";
import FormTecnicaCulinaria from "../components/receta/FormTecnicaCulinaria";
import FormEquipo from "../components/receta/FormEquipo";
import FormInformacionComplementaria from "../components/receta/FormInformacionComplementaria";
import FormFotografias from "../components/receta/FormFotografias";

function NuevaReceta() {

    const { id } = useParams();

    const navigate = useNavigate();

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

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setDatosReceta((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const actualizarIngredientes = (nuevosIngredientes) => {

        setDatosReceta((prev) => ({
            ...prev,
            ingredientes: nuevosIngredientes
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

    const actualizarFotografias = (nuevasFotografias) => {

        setDatosReceta((prev) => ({
            ...prev,
            fotografias: nuevasFotografias
        }));

    };

    const guardar = async (e) => {

        e.preventDefault();

        try {

            await crearReceta(id, datosReceta);

            alert("Receta creada correctamente");

            navigate(`/recetarios/${id}`);

        } catch (error) {

            console.error("Error creando receta:", error);

            alert("Error al crear la receta");

        }

    };

    return (

        <div className="nueva-receta">

            <h1>Nueva receta</h1>

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
                    Guardar receta
                </button>

            </form>

        </div>

    );

}

export default NuevaReceta;