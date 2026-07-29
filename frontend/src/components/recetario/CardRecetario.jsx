function CardRecetario({ recetario }) {
    return (
        <div className="card-recetario">

            <h3>{recetario.nombre}</h3>

            <p>
                {recetario.descripcion || "Sin descripción"}
            </p>

            <div className="card-footer">

                <span>
                    📖 Recetas
                </span>

                <button>
                    Abrir
                </button>

            </div>

        </div>
    );
}

export default CardRecetario;