import { useState } from "react";

function FormIngredientes({
    ingredientes,
    setIngredientes
}) {

    const [nuevoIngrediente, setNuevoIngrediente] = useState({
        nombre: "",
        cantidad: "",
        unidad: "",
        costo_unitario: "",
        rendimiento: ""
    });

    const cambiarCampo = (e) => {

        const { name, value } = e.target;

        setNuevoIngrediente((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const agregarIngrediente = () => {

        if (
            !nuevoIngrediente.nombre.trim() ||
            !nuevoIngrediente.cantidad ||
            !nuevoIngrediente.unidad
        ) {
            alert("Completa al menos el nombre, cantidad y unidad.");
            return;
        }

        const cantidad = Number(nuevoIngrediente.cantidad) || 0;
        const costo = Number(nuevoIngrediente.costo_unitario) || 0;

        const ingrediente = {
            ...nuevoIngrediente,
            importe: (cantidad * costo).toFixed(2)
        };

        setIngredientes([
            ...ingredientes,
            ingrediente
        ]);

        setNuevoIngrediente({
            nombre: "",
            cantidad: "",
            unidad: "",
            costo_unitario: "",
            rendimiento: ""
        });

    };

    const eliminarIngrediente = (index) => {

        const nuevos = ingredientes.filter(
            (_, i) => i !== index
        );

        setIngredientes(nuevos);

    };

    return (

        <section className="form-seccion">

            <h2>Ingredientes</h2>

            <div className="ingrediente-form">

                <input
                    type="text"
                    name="nombre"
                    placeholder="Ingrediente"
                    value={nuevoIngrediente.nombre}
                    onChange={cambiarCampo}
                />

                <input
                    type="number"
                    name="cantidad"
                    placeholder="Cantidad"
                    value={nuevoIngrediente.cantidad}
                    onChange={cambiarCampo}
                />

                <input
                    type="text"
                    name="unidad"
                    placeholder="Unidad"
                    value={nuevoIngrediente.unidad}
                    onChange={cambiarCampo}
                />

                <input
                    type="number"
                    step="0.01"
                    name="costo_unitario"
                    placeholder="Costo unitario"
                    value={nuevoIngrediente.costo_unitario}
                    onChange={cambiarCampo}
                />

                <input
                    type="text"
                    name="rendimiento"
                    placeholder="Rendimiento (%)"
                    value={nuevoIngrediente.rendimiento}
                    onChange={cambiarCampo}
                />

                <button
                    type="button"
                    onClick={agregarIngrediente}
                >
                    + Agregar
                </button>

            </div>

            {
                ingredientes.length > 0 && (

                    <table className="tabla-ingredientes">

                        <thead>

                            <tr>

                                <th>Ingrediente</th>

                                <th>Cantidad</th>

                                <th>Unidad</th>

                                <th>Costo</th>

                                <th>Rendimiento</th>

                                <th>Importe</th>

                                <th></th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                ingredientes.map((ingrediente, index) => (

                                    <tr key={index}>

                                        <td>{ingrediente.nombre}</td>

                                        <td>{ingrediente.cantidad}</td>

                                        <td>{ingrediente.unidad}</td>

                                        <td>${ingrediente.costo_unitario}</td>

                                        <td>{ingrediente.rendimiento}</td>

                                        <td>${ingrediente.importe}</td>

                                        <td>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    eliminarIngrediente(index)
                                                }
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                )
            }

        </section>

    );

}

export default FormIngredientes;