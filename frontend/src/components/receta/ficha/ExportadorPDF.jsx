import { useEffect, useState } from "react";

import FichaReceta from "./FichaReceta";

import {
    obtenerDetalleReceta
} from "../../../services/recetaService";

function ExportadorPDF({

    idRecetario,

    recetas,

    exportando,

    onListo

}) {

    const [recetasCompletas, setRecetasCompletas] = useState([]);

    useEffect(() => {

        if (!exportando) {

            setRecetasCompletas([]);

            return;

        }

        cargarRecetas();

    }, [exportando]);



    const cargarRecetas = async () => {

        try {

            const detalles = [];

            for (const receta of recetas) {

                const detalle = await obtenerDetalleReceta(

                    idRecetario,

                    receta.id_receta

                );

                detalles.push(detalle);

            }

            setRecetasCompletas(detalles);

            if (onListo) {

                onListo(detalles);

            }

        } catch (error) {

            console.error(

                "Error obteniendo las recetas para exportar:",

                error

            );

        }

    };



    if (!exportando) {

        return null;

    }

    return (

        <div
            id="contenedor-exportacion-pdf"
            style={{

                position: "absolute",

                left: "-10000px",

                top: 0,

                width: "210mm",

                background: "#fff",

                zIndex: -1

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

    );

}

export default ExportadorPDF;