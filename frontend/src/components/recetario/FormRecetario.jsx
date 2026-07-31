import { useState } from "react";

function FormRecetario({

    onGuardar,

    onCancelar,

    recetario = null

}) {

    const [nombre, setNombre] = useState(

    recetario?.nombre || ""

    );

    const [descripcion, setDescripcion] = useState(

        recetario?.descripcion || ""

    );

    const enviar = (e) => {

        e.preventDefault();

        if (!nombre.trim()) {

            alert("Ingresa el nombre del recetario.");

            return;

        }

        onGuardar({

            nombre: nombre.trim(),

            descripcion: descripcion.trim()

        });

        setNombre("");

        setDescripcion("");

    };

    return (

        <div className="modal-overlay">

            <div className="modal-recetario">

                <h2>

                {

                    recetario

                        ? "✏ Editar Recetario"

                        : "📚 Nuevo Recetario"

                }

                </h2>

                <form onSubmit={enviar}>

                    <label htmlFor="nombre">

                        Nombre del recetario

                    </label>

                    <input
                        id="nombre"
                        type="text"
                        placeholder="Ej. Bases Culinarias II"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        autoFocus
                    />

                    <label htmlFor="descripcion">

                        Descripción

                    </label>

                    <textarea
                        id="descripcion"
                        rows="4"
                        placeholder="Describe el contenido de este recetario..."
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />

                    <div className="modal-buttons">

                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={onCancelar}
                        >

                            Cancelar

                        </button>

                        <button
                            type="submit"
                            className="btn-guardar"
                        >

                            {

                                recetario

                                    ? "Actualizar"

                                    : "Guardar"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default FormRecetario;