function FichaPagina1({ receta }) {

    return (

        <section className="ficha-pagina">

            <header className="ficha-header">

                <div className="titulo">

                    <h2>Ficha de Recetario de Alimentos</h2>

                    <h1>Gastronomía</h1>

                </div>

            </header>


            <table className="tabla-datos">

                <tbody>

                    <tr>
                        <th>Asignatura</th>
                        <td>{receta.asignatura}</td>

                        <th>Clasificación</th>
                        <td>{receta.clasificacion}</td>
                    </tr>

                    <tr>
                        <th>Nombre del platillo</th>
                        <td>{receta.nombre_platillo}</td>

                        <th>Número de práctica</th>
                        <td>{receta.numero_practica}</td>
                    </tr>

                    <tr>
                        <th>Fecha</th>
                        <td>{receta.fecha}</td>

                        <th>Tiempo preparación</th>
                        <td>{receta.tiempo_preparacion}</td>
                    </tr>

                    <tr>
                        <th>Total producción</th>
                        <td>{receta.total_produccion}</td>

                        <th>Aporte nutrimental</th>
                        <td>{receta.aporte_nutrimental}</td>
                    </tr>

                    <tr>
                        <th>Porciones</th>
                        <td>{receta.numero_porciones}</td>

                        <th>Conservación</th>
                        <td>{receta.metodo_tiempo_conservacion}</td>
                    </tr>

                    <tr>
                        <th>Cantidad por porción</th>
                        <td>{receta.cantidad_porcion}</td>

                        <th>Maridaje</th>
                        <td>{receta.maridaje}</td>
                    </tr>

                </tbody>

            </table>


            <table className="tabla-ingredientes">

                <thead>

                    <tr>

                        <th>CANT.</th>

                        <th>UNIDAD</th>

                        <th>MATERIA PRIMA</th>

                        <th>COSTO UNITARIO</th>

                        <th>% REND.</th>

                        <th>IMPORTE</th>

                    </tr>

                </thead>

                <tbody>

                    {receta.ingredientes.map((item) => (

                        <tr key={item.id_ingrediente_receta}>

                            <td>{item.cantidad}</td>

                            <td>{item.unidad}</td>

                            <td>{item.nombre}</td>

                            <td>${item.costo_unitario}</td>

                            <td>{item.rendimiento}</td>

                            <td>${item.importe}</td>

                        </tr>

                    ))}

                </tbody>

            </table>


            <div className="pie-pagina1">

                <div>

                    <h3>Buenas Prácticas de Higiene</h3>

                    <p>

                        {receta.informacion_complementaria?.buenas_practicas}

                    </p>

                </div>

                <div>

                    <p>

                        <strong>Costo receta:</strong>

                        ${receta.costo_total}

                    </p>

                    <p>

                        <strong>Costo por porción:</strong>

                        ${receta.costo_por_porcion}

                    </p>

                </div>

            </div>

        </section>

    );

}

export default FichaPagina1;