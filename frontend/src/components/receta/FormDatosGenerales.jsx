function FormDatosGenerales({
    datos,
    onChange
}) {

    return (

    <div className="nueva-receta">

        <h1>
            Nueva receta
        </h1>

        <p>
            Completa la información de la receta.
        </p>

        <form onSubmit={guardar}>

            <FormDatosGenerales
                datos={datosReceta}
                onChange={manejarCambio}
            />

            <FormIngredientes
                ingredientes={datosReceta.ingredientes}
                setIngredientes={actualizarIngredientes}
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

export default FormDatosGenerales;