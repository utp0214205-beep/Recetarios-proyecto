import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    obtenerRecetarioPorId
} from "../services/recetarioService";

import {
    obtenerRecetas,
    obtenerDetalleReceta
} from "../services/recetaService";

import {
    exportarRecetarioPDF
} from "../utils/exportarRecetarioPDF";

import FichaReceta from "../components/receta/ficha/FichaReceta";

import "../assets/styles/recetario.css";

function RecetarioDetalle() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [recetario, setRecetario] = useState(null);

    const [recetas, setRecetas] = useState([]);

    const [recetasCompletas, setRecetasCompletas] = useState([]);

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

            const detalles = await Promise.all(

                datosRecetas.map((receta) =>

                    obtenerDetalleReceta(
                        id,
                        receta.id_receta
                    )

                )

            );

            setRecetario(datosRecetario);

            setRecetas(datosRecetas);

            setRecetasCompletas(detalles);

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

    const exportarPDF = async () => {

        try {

            await exportarRecetarioPDF(
                recetario.nombre
            );

        } catch (error) {

            console.error(
                "Error al exportar el recetario:",
                error
            );

        }

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

                <p className="contador-recetas">

                    {recetas.length}

                    {recetas.length === 1
                        ? " receta registrada"
                        : " recetas registradas"}

                </p>

                <div className="acciones-recetario">

                    <button
                        className="boton-nueva-receta"
                        onClick={nuevaReceta}
                    >

                        + Nueva receta

                    </button>

                    <button
                        className="boton-exportar-pdf"
                        onClick={exportarPDF}
                    >

                        📄 Exportar recetario PDF

                    </button>

                </div>

            </section>
            <hr className="separador-recetario" />

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
                            >

                                <h3>

                                    🍽 {receta.nombre_platillo}

                                </h3>

                                <span className="etiqueta-clasificacion">

                                    Clasificación:

                                </span>

                                <p className="valor-clasificacion">

                                    {receta.clasificacion || "Sin clasificación"}

                                </p>

                                <div className="acciones-receta">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/recetarios/${id}/recetas/${receta.id_receta}`
                                            )
                                        }
                                    >

                                        Abrir

                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/recetarios/${id}/recetas/${receta.id_receta}/editar`
                                            )
                                        }
                                    >

                                        Editar

                                    </button>

                                </div>

                            </div>

                        ))

                    )

                }

            </section>

            {/* ===========================================
                FICHAS OCULTAS PARA EXPORTACIÓN PDF
            ============================================ */}

            <div
                id="contenedor-exportacion"
                style={{
                    position: "absolute",
                    left: "-10000px",
                    top: 0,
                    background: "#ffffff"
                }}
            >

                {

                    recetasCompletas.map((receta) => (

                        <FichaReceta
                            key={receta.id_receta}
                            receta={receta}
                        />

                    ))

                }

            </div>

        </div>

    );

}

export default RecetarioDetalle;