import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import ListaRecetarios from "../components/recetario/ListaRecetarios";
import FormRecetario from "../components/recetario/FormRecetario";

import {
    obtenerRecetarios,
    crearRecetario
} from "../services/recetarioService";


function Recetarios() {

    const { alumno } = useAuth();

    const [recetarios, setRecetarios] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [cargando, setCargando] = useState(true);



    const cargarRecetarios = async () => {

        try {

            const datos = await obtenerRecetarios(
                alumno.id_alumno
            );

            setRecetarios(datos);


        } catch (error) {

            console.error(
                "Error cargando recetarios:",
                error
            );

        } finally {

            setCargando(false);

        }

    };



    useEffect(() => {

        if (alumno) {

            cargarRecetarios();

        }

    }, [alumno]);




    const guardarRecetario = async (datos) => {

        try {

            const nuevo = await crearRecetario({

                ...datos,

                id_alumno: alumno.id_alumno

            });



            setRecetarios([

                ...recetarios,

                nuevo.recetario

            ]);



            setMostrarFormulario(false);



        } catch (error) {

            console.error(
                "Error creando recetario:",
                error
            );

        }

    };




    if (cargando) {

        return (

            <p>
                Cargando recetarios...
            </p>

        );

    }




    return (

        <div className="recetarios-page">


            <div className="recetarios-header">


                <h1>
                    Mis Recetarios
                </h1>



                <button

                    className="btn-guardar"

                    onClick={() => setMostrarFormulario(true)}

                >

                    + Nuevo Recetario

                </button>



            </div>





            <ListaRecetarios

                recetarios={recetarios}

            />






            {

                mostrarFormulario && (

                    <FormRecetario

                        onGuardar={guardarRecetario}

                        onCancelar={() => setMostrarFormulario(false)}

                    />

                )

            }





        </div>

    );

}


export default Recetarios;