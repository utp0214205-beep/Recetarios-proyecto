import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    crearReceta
} from "../services/recetaService";

import FormIngredientes from "../components/receta/FormIngredientes";


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








    const guardar = async (e) => {


        e.preventDefault();



        try {


            await crearReceta(

                id,

                datosReceta

            );



            alert(

                "Receta creada correctamente"

            );



            navigate(

                `/recetarios/${id}`

            );



        } catch (error) {


            console.error(

                "Error creando receta:",

                error

            );



            alert(

                "Error al crear la receta"

            );


        }


    };









    return (


        <div className="nueva-receta">





            <h1>

                Nueva receta

            </h1>





            <p>

                Completa la información de la receta.

            </p>








            <form onSubmit={guardar}>





                <h2>

                    Datos generales

                </h2>






                <label>

                    Nombre del platillo

                </label>


                <input


                    type="text"


                    name="nombre_platillo"


                    value={
                        datosReceta.nombre_platillo
                    }


                    onChange={manejarCambio}


                    required


                />








                <label>

                    Asignatura

                </label>


                <input


                    type="text"


                    name="asignatura"


                    value={
                        datosReceta.asignatura
                    }


                    onChange={manejarCambio}


                />









                <label>

                    Clasificación

                </label>


                <input


                    type="text"


                    name="clasificacion"


                    value={
                        datosReceta.clasificacion
                    }


                    onChange={manejarCambio}


                />









                <label>

                    Fecha

                </label>


                <input


                    type="date"


                    name="fecha"


                    value={
                        datosReceta.fecha
                    }


                    onChange={manejarCambio}


                />









                <FormIngredientes


                    ingredientes={
                        datosReceta.ingredientes
                    }


                    setIngredientes={
                        actualizarIngredientes
                    }


                />









                <button


                    type="submit"


                >

                    Guardar receta


                </button>





            </form>





        </div>


    );


}


export default NuevaReceta;