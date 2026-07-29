import { useState } from "react";

function FormRecetario({ onGuardar, onCancelar }) {

    const [nombre, setNombre] = useState("");

    const enviar = (e) => {

        e.preventDefault();

        if (!nombre.trim()) return;

        onGuardar({
            nombre: nombre.trim()
        });

        setNombre("");

    };

    return (

        <div className="modal-overlay">

            <div className="modal-recetario">

                <h2>Nuevo Recetario</h2>

                <form onSubmit={enviar}>

                    <label htmlFor="nombre">
                        Nombre del recetario
                    </label>

                    <input
                        id="nombre"
                        type="text"
                        placeholder="Ej. Cocina Mexicana"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        autoFocus
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
                            Guardar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default FormRecetario;