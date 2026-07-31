function FichaPagina2({ receta }) {

    const fotoPrincipal =
        receta.fotografias?.length > 0
            ? receta.fotografias[0].imagen
            : null;

    return (

        <section className="ficha-pagina">

            <header className="ficha-header">

                <div className="titulo">

                    <h2>Ficha de Recetario de Alimentos</h2>

                    <h1>Gastronomía</h1>

                </div>

            </header>

            <div className="procedimiento-grid">

                <section className="procedimiento">

                    <h3>
                        TÉCNICAS DE PREPARACIÓN Y PROCEDIMIENTOS
                    </h3>

                    <h4>Mise en Place</h4>

                    <p>

                        {receta.procedimiento?.mise_en_place}

                    </p>

                    <h4>Instrucciones</h4>

                    <p>

                        {receta.procedimiento?.instrucciones}

                    </p>

                </section>

                <section className="montaje">

                    <h3>

                        MONTAJE Y PRESENTACIÓN

                    </h3>

                    {

                        fotoPrincipal ? (

                            <img
                                src={fotoPrincipal}
                                alt={receta.nombre_platillo}
                            />

                        ) : (

                            <div className="sin-foto">

                                Sin fotografía

                            </div>

                        )

                    }

                </section>

            </div>


            <table className="tabla-tecnica">

                <tbody>

                    <tr>

                        <th>Tipos de corte</th>

                        <td>

                            {receta.tecnica_culinaria?.tipo_corte}

                        </td>

                    </tr>

                    <tr>

                        <th>Métodos de cocción</th>

                        <td>

                            {receta.tecnica_culinaria?.metodo_coccion}

                        </td>

                    </tr>

                    <tr>

                        <th>Técnicas de elaboración</th>

                        <td>

                            {receta.tecnica_culinaria?.tecnica_elaboracion}

                        </td>

                    </tr>

                </tbody>

            </table>



            <table className="tabla-equipo">

                <tbody>

                    <tr>

                        <th>Utensilios</th>

                        <th>Temperatura cocción</th>

                        <th>Material extra</th>

                        <th>Unidades de medición</th>

                    </tr>

                    <tr>

                        <td>

                            {receta.equipo?.utensilios}

                        </td>

                        <td>

                            <strong>Cocción:</strong>

                            <br />

                            {receta.equipo?.temperatura_coccion}

                            <br /><br />

                            <strong>Servicio:</strong>

                            <br />

                            {receta.equipo?.temperatura_servicio}

                        </td>

                        <td>

                            {receta.equipo?.material_extra}

                        </td>

                        <td>

                            {receta.equipo?.unidades_medicion}

                        </td>

                    </tr>

                </tbody>

            </table>


            <section className="informacion">

                <h3>

                    Historia / Origen

                </h3>

                <p>

                    {receta.informacion_complementaria?.historia}

                </p>

                <h3>

                    Conclusiones

                </h3>

                <p>

                    {receta.informacion_complementaria?.conclusiones}

                </p>

                <h3>

                    Referencias

                </h3>

                <p>

                    {receta.informacion_complementaria?.referencias}

                </p>

            </section>

        </section>

    );

}

export default FichaPagina2;