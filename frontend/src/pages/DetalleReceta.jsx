import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { obtenerDetalleReceta } from "../services/recetaService";

import "../assets/styles/detalleReceta.css";
import "../assets/styles/fichaReceta.css";

import FichaReceta from "../components/receta/ficha/FichaReceta";
import DetalleDatosGenerales from "../components/receta/detalle/DetalleDatosGenerales";

function DetalleReceta() {

    const { idRecetario, idReceta } = useParams();

    const navigate = useNavigate();

    const [receta, setReceta] = useState(null);

    const [cargando, setCargando] = useState(true);

    useEffect(() => {

        cargarReceta();

    }, []);

    const cargarReceta = async () => {

        try {

            const data = await obtenerDetalleReceta(
                idRecetario,
                idReceta
            );

            setReceta(data);

        } catch (error) {

            console.error(error);

        } finally {

            setCargando(false);

        }

    };

    if (cargando) {

        return <h2>Cargando receta...</h2>;

    }

    if (!receta) {

        return <h2>No existe la receta.</h2>;

    }

    return (

        <div className="detalle-receta">

            <div className="detalle-header">

                <div className="detalle-titulo">

                    <h1>

                        {receta.nombre_platillo}

                    </h1>

                    <p>

                        {receta.clasificacion}

                    </p>

                </div>

                <div className="detalle-acciones">

                    <button
                        className="btn-editar"
                        onClick={() =>
                            navigate(
                                `/recetarios/${idRecetario}/recetas/${idReceta}/editar`
                            )
                        }
                    >

                        ✏ Editar receta

                    </button>

                    <button
                        className="btn-regresar"
                        onClick={() => navigate(-1)}
                    >

                        ← Regresar

                    </button>

                </div>

            </div>

            <FichaReceta
                receta={receta}
            />

        </div>

    );

}

export default DetalleReceta;