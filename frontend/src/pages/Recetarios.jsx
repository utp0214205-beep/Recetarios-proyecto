import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import ListaRecetarios from "../components/recetario/ListaRecetarios";
import FormRecetario from "../components/recetario/FormRecetario";

import {
    obtenerRecetarios,
    crearRecetario,
    eliminarRecetario
} from "../services/recetarioService";


function Recetarios() {

    const { alumno } = useAuth();

    const navigate = useNavigate();


    const [recetarios, setRecetarios] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [cargando, setCargando] = useState(true);



    useEffect(() => {

        if (alumno) {

            cargarRecetarios();

        }

    }, [alumno]);



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



    const guardarRecetario = async (datos) => {

        try {

            await crearRecetario({

                ...datos,

                id_alumno: alumno.id_alumno

            });


            await cargarRecetarios();


            setMostrarFormulario(false);



        } catch (error) {

            console.error(
                "Error creando recetario:",
                error
            );

        }

    };



    const abrirRecetario = (recetario) => {

        navigate(
            `/recetarios/${recetario.id_recetario}`
        );

    };



    const editarRecetario = (recetario) => {

        console.log(
            "Editar recetario:",
            recetario
        );

        // Aquí después abriremos
        // el formulario con datos existentes

    };



    const borrarRecetario = async (id) => {

        const confirmar = window.confirm(
            "¿Deseas eliminar este recetario?"
        );


        if (!confirmar) return;



        try {

            await eliminarRecetario(id);


            await cargarRecetarios();



        } catch (error) {

            console.error(
                "Error eliminando recetario:",
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

                    onClick={() =>
                        setMostrarFormulario(true)
                    }

                >

                    + Nuevo Recetario

                </button>


            </div>





            <ListaRecetarios

                recetarios={recetarios}

                onAbrir={abrirRecetario}

                onEditar={editarRecetario}

                onEliminar={borrarRecetario}

            />





            {

                mostrarFormulario && (

                    <FormRecetario

                        onGuardar={guardarRecetario}

                        onCancelar={() =>
                            setMostrarFormulario(false)
                        }

                    />

                )

            }



        </div>

    );

}


export default Recetarios;