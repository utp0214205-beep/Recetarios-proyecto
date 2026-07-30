function DetalleCabecera({ receta }) {

    return (

        <header className="cabecera-ficha">

            <div>

                <h1>

                    {receta.nombre_platillo}

                </h1>

                <p>

                    {receta.clasificacion}

                </p>

            </div>

        </header>

    );

}

export default DetalleCabecera;