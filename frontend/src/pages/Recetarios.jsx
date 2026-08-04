import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import ListaRecetarios from "../components/recetario/ListaRecetarios";
import FormRecetario from "../components/recetario/FormRecetario";

import {
    obtenerRecetarios,
    crearRecetario,
    actualizarRecetario,
    eliminarRecetario
} from "../services/recetarioService";

import {
    alertaError,
    alertaExito,
    confirmarEliminar
} from "../utils/alertas";

function Recetarios() {

    const { alumno } = useAuth();

    const navigate = useNavigate();

    const [recetarios, setRecetarios] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [recetarioEditando, setRecetarioEditando] = useState(null);

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

            alertaError(
                "No fue posible cargar los recetarios."
            );

        } finally {

            setCargando(false);

        }

    };

    const guardarRecetario = async (datos) => {

        try {

            if (recetarioEditando) {

                await actualizarRecetario(

                    recetarioEditando.id_recetario,

                    datos

                );

                alertaExito(
                    "Los cambios se guardaron correctamente."
                );

            } else {

                await crearRecetario({

                    ...datos,

                    id_alumno: alumno.id_alumno

                });

                alertaExito(
                    "El recetario se creó correctamente."
                );

            }

            await cargarRecetarios();

            setMostrarFormulario(false);

            setRecetarioEditando(null);

        } catch (error) {

            console.error(error);

            alertaError(
                "No fue posible guardar el recetario."
            );

        }

    };

    const abrirRecetario = (recetario) => {

        navigate(
            `/recetarios/${recetario.id_recetario}`
        );

    };

    const editarRecetario = (recetario) => {

        setRecetarioEditando(recetario);

        setMostrarFormulario(true);

    };

    const borrarRecetario = async (id) => {

        const resultado = await confirmarEliminar();

        if (!resultado.isConfirmed) return;

        try {

            await eliminarRecetario(id);

            await cargarRecetarios();

            alertaExito(
                "El recetario fue eliminado correctamente."
            );

        } catch (error) {

            console.error(
                "Error eliminando recetario:",
                error
            );

            alertaError(
                "No fue posible eliminar el recetario."
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

                        recetario={recetarioEditando}

                        onGuardar={guardarRecetario}

                        onCancelar={() => {

                            setMostrarFormulario(false);

                            setRecetarioEditando(null);

                        }}

                    />

                )

            }

        </div>

    );

}

export default Recetarios;