import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { obtenerDetalleReceta } from "../services/recetaService";
import "../assets/styles/detalleReceta.css";

import DetalleCabecera from "../components/receta/detalle/DetalleCabecera";
import DetalleDatosGenerales from "../components/receta/detalle/DetalleDatosGenerales";
import DetalleIngredientes from "../components/receta/detalle/DetalleIngredientes";
import FichaReceta from "../components/receta/ficha/FichaReceta";
import "../assets/styles/fichaReceta.css";

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

                <button
                    className="btn-regresar"
                    onClick={() => navigate(-1)}
                >
                    ← Regresar
                </button>

            </div>

            <FichaReceta
                receta={receta}
            />

        </div>

    );
    }

export default DetalleReceta;