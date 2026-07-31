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

                        {recetario.fecha_creacion
                            ? new Date(recetario.fecha_creacion).toLocaleDateString()
                            : "Fecha no disponible"}

                    </span>

                </div>

            </div>

            <div className="tarjeta-centro">

                <p>

                    {recetario.descripcion ||
                        "Recetario gastronómico."}

                </p>

            </div>

            <div className="tarjeta-footer">

                <button
                    className="btn-abrir"
                    onClick={() => onAbrir(recetario)}
                >

                    👁 Abrir

                </button>

                <button
                    className="btn-editar"
                    onClick={() => onEditar(recetario)}
                >

                    ✏ Editar

                </button>

                <button
                    className="btn-eliminar"
                    onClick={() =>
                        onEliminar(recetario.id_recetario)
                    }
                >

                    🗑 Eliminar

                </button>

            </div>

        </article>

    );

}

export default TarjetaRecetario;