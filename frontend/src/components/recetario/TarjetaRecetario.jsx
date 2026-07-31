function TarjetaRecetario({
    recetario,
    onEditar,
    onEliminar,
    onAbrir
}) {

    return (

        <article className="tarjeta-recetario">

            <div className="tarjeta-superior">

                <div className="icono-recetario">

                    📚

                </div>

                <div>

                    <h3>

                        {recetario.nombre}

                    </h3>

                    <span className="fecha-recetario">

                        {

                            recetario.fecha_creacion

                                ? new Date(
                                    recetario.fecha_creacion
                                ).toLocaleDateString()

                                : "Fecha no disponible"

                        }

                    </span>

                </div>

            </div>

            <div className="tarjeta-centro">

                <p>

                    Creado el{" "}

                    {

                        recetario.fecha_creacion

                            ? new Date(
                                recetario.fecha_creacion
                            ).toLocaleDateString()

                            : "Sin fecha"

                    }

                </p>

            </div>

            <div className="tarjeta-footer">

                {

                    onAbrir && (

                        <button
                            className="btn-abrir"
                            onClick={() => onAbrir(recetario)}
                        >

                            👁 Abrir

                        </button>

                    )

                }

                {

                    onEditar && (

                        <button
                            className="btn-editar"
                            onClick={() => onEditar(recetario)}
                        >

                            ✏ Editar nombre

                        </button>

                    )

                }

                {

                    onEliminar && (

                        <button
                            className="btn-eliminar"
                            onClick={() =>
                                onEliminar(
                                    recetario.id_recetario
                                )
                            }
                        >

                            🗑 Eliminar

                        </button>

                    )

                }

            </div>

        </article>

    );

}

export default TarjetaRecetario;